#!/usr/bin/env python3
"""
Бэкенд лендинга repetitoryadom.kz.

Две задачи:
  1. Приём заявок с форм и пересылка их в Telegram. Токен бота живёт здесь,
     на сервере, и в браузер не попадает.
  2. Админка: правка контента сайта и загрузка картинок.

Слушает только localhost — наружу его проксирует nginx.

Контент лежит в /var/www/content/content.json, откуда nginx отдаёт его
как обычную статику. Поэтому если этот сервис остановлен, сайт продолжает
работать — недоступна только правка.
"""

import base64
import hashlib
import hmac
import html
import io
import json
import os
import re
import secrets
import shutil
import sys
import time
import urllib.error
import urllib.request
from collections import deque
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from zoneinfo import ZoneInfo

# --- конфигурация -----------------------------------------------------------

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "").strip()
CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "").strip()
PORT = int(os.environ.get("PORT", "8081"))
ADMIN_PASSWORD_HASH = os.environ.get("ADMIN_PASSWORD_HASH", "").strip()

CONTENT_DIR = Path(os.environ.get("CONTENT_DIR", "/var/www/content"))
CONTENT_FILE = CONTENT_DIR / "content.json"
UPLOADS_DIR = CONTENT_DIR / "uploads"
HISTORY_DIR = CONTENT_DIR / "history"

# Сервер живёт в UTC, а школа в Алматы — иначе время в заявке выглядит
# на 5 часов раньше реального.
LOCAL_TZ = ZoneInfo(os.environ.get("LEAD_TZ", "Asia/Almaty"))

if not BOT_TOKEN or not CHAT_ID:
    sys.exit("TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID должны быть заданы")

MAX_LEAD_BODY = 8 * 1024
MAX_CONTENT_BODY = 2 * 1024 * 1024
MAX_UPLOAD = 8 * 1024 * 1024
IMAGE_MAX_SIDE = 1400
HISTORY_KEEP = 40

SESSION_TTL = 12 * 3600
SESSION_COOKIE = "admin_session"

LEAD_RATE_LIMIT, LEAD_RATE_WINDOW = 5, 600
LOGIN_RATE_LIMIT, LOGIN_RATE_WINDOW = 8, 900

FIELDS = {"childName": 100, "age": 20, "phone": 40, "time": 120, "language": 40, "source": 60}

# --- вспомогательное --------------------------------------------------------

_hits: dict[str, dict[str, deque]] = {"lead": {}, "login": {}}
_sessions: dict[str, float] = {}


def rate_limited(bucket: str, ip: str, limit: int, window: int) -> bool:
    now = time.monotonic()
    q = _hits[bucket].setdefault(ip, deque())
    while q and now - q[0] > window:
        q.popleft()
    if len(q) >= limit:
        return True
    q.append(now)
    return False


def clean(value, limit: int) -> str:
    if not isinstance(value, str):
        return ""
    return re.sub(r"[\x00-\x1f\x7f]", " ", value).strip()[:limit]


def hash_password(password: str, salt: bytes | None = None) -> str:
    salt = salt or secrets.token_bytes(16)
    digest = hashlib.scrypt(password.encode(), salt=salt, n=2**14, r=8, p=1, dklen=32)
    return f"scrypt${base64.b64encode(salt).decode()}${base64.b64encode(digest).decode()}"


def verify_password(password: str, stored: str) -> bool:
    try:
        algo, salt_b64, digest_b64 = stored.split("$")
        if algo != "scrypt":
            return False
        expected = base64.b64decode(digest_b64)
        actual = hashlib.scrypt(password.encode(), salt=base64.b64decode(salt_b64),
                                n=2**14, r=8, p=1, dklen=32)
        return hmac.compare_digest(expected, actual)
    except Exception:
        return False


def new_session() -> str:
    token = secrets.token_urlsafe(32)
    now = time.time()
    _sessions[token] = now + SESSION_TTL
    for t, exp in list(_sessions.items()):          # чистим протухшие
        if exp < now:
            _sessions.pop(t, None)
    return token


def session_valid(token: str | None) -> bool:
    if not token:
        return False
    exp = _sessions.get(token)
    if not exp or exp < time.time():
        _sessions.pop(token, None)
        return False
    return True


# --- Telegram ---------------------------------------------------------------

def build_message(data: dict) -> str:
    e = lambda s: html.escape(s, quote=False)
    lines = [
        "🎓 <b>Новая заявка на пробный урок</b>", "",
        f"👤 <b>Имя ребёнка:</b> {e(data['childName'])}",
        f"🎂 <b>Возраст:</b> {e(data['age'])}",
        f"📱 <b>Телефон:</b> {e(data['phone'])}",
    ]
    for key, label in (("time", "⏰ <b>Удобное время:</b>"),
                       ("language", "🌐 <b>Язык:</b>"),
                       ("source", "📍 <b>Источник:</b>")):
        if data.get(key):
            lines.append(f"{label} {e(data[key])}")
    lines += ["", f"📅 {datetime.now(LOCAL_TZ).strftime('%d.%m.%Y %H:%M')} (Алматы)"]
    return "\n".join(lines)


def send_to_telegram(text: str) -> bool:
    payload = json.dumps({"chat_id": CHAT_ID, "text": text,
                          "parse_mode": "HTML", "disable_web_page_preview": True}).encode()
    req = urllib.request.Request(f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
                                 data=payload, headers={"Content-Type": "application/json"},
                                 method="POST")
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read()).get("ok", False)
    except urllib.error.HTTPError as err:
        print(f"telegram http {err.code}", flush=True)
    except Exception as err:
        print(f"telegram error: {type(err).__name__}", flush=True)
    return False


# --- контент ----------------------------------------------------------------

def ensure_dirs() -> None:
    for d in (CONTENT_DIR, UPLOADS_DIR, HISTORY_DIR):
        d.mkdir(parents=True, exist_ok=True)


def save_content(data: dict) -> str:
    """Пишет контент атомарно и оставляет копию в истории."""
    ensure_dirs()
    stamp = datetime.now(LOCAL_TZ).strftime("%Y%m%d-%H%M%S")

    if CONTENT_FILE.exists():
        shutil.copy2(CONTENT_FILE, HISTORY_DIR / f"content-{stamp}.json")

    data["updatedAt"] = datetime.now(LOCAL_TZ).isoformat(timespec="seconds")
    tmp = CONTENT_FILE.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(CONTENT_FILE)
    CONTENT_FILE.chmod(0o644)

    versions = sorted(HISTORY_DIR.glob("content-*.json"))
    for old in versions[:-HISTORY_KEEP]:
        old.unlink(missing_ok=True)
    return stamp


def list_versions() -> list[dict]:
    ensure_dirs()
    out = []
    for f in sorted(HISTORY_DIR.glob("content-*.json"), reverse=True):
        out.append({"id": f.stem.replace("content-", ""),
                    "size": f.stat().st_size,
                    "savedAt": datetime.fromtimestamp(f.stat().st_mtime, LOCAL_TZ)
                                       .strftime("%d.%m.%Y %H:%M")})
    return out


IMAGE_SIGNATURES = {
    b"\xff\xd8\xff": ("jpg", "JPEG"),
    b"\x89PNG\r\n\x1a\n": ("png", "PNG"),
    b"RIFF": ("webp", "WEBP"),
}


def detect_image(raw: bytes) -> tuple[str, str] | None:
    for sig, kind in IMAGE_SIGNATURES.items():
        if raw.startswith(sig):
            if kind[0] == "webp" and raw[8:12] != b"WEBP":
                continue
            return kind
    return None


def store_image(raw: bytes, ext: str) -> str:
    """Сохраняет картинку, по возможности ужимая её."""
    ensure_dirs()
    name = f"{datetime.now(LOCAL_TZ).strftime('%Y%m%d-%H%M%S')}-{secrets.token_hex(4)}"
    try:
        from PIL import Image                      # необязательная зависимость
        img = Image.open(io.BytesIO(raw))
        img = img.convert("RGB") if img.mode in ("RGBA", "P", "LA") else img
        img.thumbnail((IMAGE_MAX_SIDE, IMAGE_MAX_SIDE), Image.LANCZOS)
        path = UPLOADS_DIR / f"{name}.jpg"
        img.save(path, "JPEG", quality=82, optimize=True)
    except Exception:
        path = UPLOADS_DIR / f"{name}.{ext}"       # без Pillow кладём как есть
        path.write_bytes(raw)
    path.chmod(0o644)
    return f"/uploads/{path.name}"


# --- HTTP -------------------------------------------------------------------

class Handler(BaseHTTPRequestHandler):
    server_version = "site-backend"
    sys_version = ""

    # -- утилиты ответа
    def _reply(self, code: int, payload: dict, cookie: str | None = None) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        if cookie:
            self.send_header("Set-Cookie", cookie)
        self.end_headers()
        self.wfile.write(body)

    def _client_ip(self) -> str:
        return self.headers.get("X-Real-IP", self.client_address[0])

    def _read_body(self, limit: int) -> bytes | None:
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            return None
        if length <= 0 or length > limit:
            return None
        return self.rfile.read(length)

    def _session_token(self) -> str | None:
        raw = self.headers.get("Cookie", "")
        for part in raw.split(";"):
            name, _, value = part.strip().partition("=")
            if name == SESSION_COOKIE:
                return value
        return None

    def _require_auth(self) -> bool:
        if session_valid(self._session_token()):
            return True
        self._reply(401, {"ok": False, "error": "нужен вход"})
        return False

    # -- маршруты
    def do_POST(self) -> None:
        path = self.path.rstrip("/") or "/"

        if path == "/api/lead":
            return self._handle_lead()
        if path == "/api/admin/login":
            return self._handle_login()
        if path == "/api/admin/logout":
            _sessions.pop(self._session_token() or "", None)
            return self._reply(200, {"ok": True},
                               cookie=f"{SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict")
        if path == "/api/admin/content":
            return self._handle_save_content()
        if path == "/api/admin/upload":
            return self._handle_upload()
        if path == "/api/admin/restore":
            return self._handle_restore()

        self._reply(404, {"ok": False, "error": "not found"})

    def do_GET(self) -> None:
        path = self.path.rstrip("/") or "/"
        if path == "/api/health":
            return self._reply(200, {"ok": True})
        if path == "/api/admin/session":
            return self._reply(200, {"ok": True, "authorized": session_valid(self._session_token())})
        if path == "/api/admin/versions":
            if not self._require_auth():
                return
            return self._reply(200, {"ok": True, "versions": list_versions()})
        self._reply(404, {"ok": False, "error": "not found"})

    # -- заявки
    def _handle_lead(self) -> None:
        if rate_limited("lead", self._client_ip(), LEAD_RATE_LIMIT, LEAD_RATE_WINDOW):
            return self._reply(429, {"ok": False, "error": "too many requests"})
        raw = self._read_body(MAX_LEAD_BODY)
        if raw is None:
            return self._reply(400, {"ok": False, "error": "bad length"})
        try:
            data = json.loads(raw)
            if not isinstance(data, dict):
                raise ValueError
        except Exception:
            return self._reply(400, {"ok": False, "error": "bad json"})

        cleaned = {k: clean(data.get(k), limit) for k, limit in FIELDS.items()}
        if not cleaned["childName"] or not cleaned["phone"]:
            return self._reply(400, {"ok": False, "error": "childName и phone обязательны"})
        if send_to_telegram(build_message(cleaned)):
            return self._reply(200, {"ok": True})
        self._reply(502, {"ok": False, "error": "delivery failed"})

    # -- админка
    def _handle_login(self) -> None:
        if not ADMIN_PASSWORD_HASH:
            return self._reply(503, {"ok": False, "error": "пароль администратора не задан"})
        if rate_limited("login", self._client_ip(), LOGIN_RATE_LIMIT, LOGIN_RATE_WINDOW):
            return self._reply(429, {"ok": False, "error": "слишком много попыток, подождите"})
        raw = self._read_body(4096)
        if raw is None:
            return self._reply(400, {"ok": False, "error": "bad length"})
        try:
            password = json.loads(raw).get("password", "")
        except Exception:
            return self._reply(400, {"ok": False, "error": "bad json"})

        time.sleep(0.4)                              # притормаживаем перебор
        if not isinstance(password, str) or not verify_password(password, ADMIN_PASSWORD_HASH):
            return self._reply(401, {"ok": False, "error": "неверный пароль"})

        token = new_session()
        self._reply(200, {"ok": True}, cookie=(
            f"{SESSION_COOKIE}={token}; Path=/; Max-Age={SESSION_TTL}; "
            f"HttpOnly; Secure; SameSite=Strict"))

    def _handle_save_content(self) -> None:
        if not self._require_auth():
            return
        raw = self._read_body(MAX_CONTENT_BODY)
        if raw is None:
            return self._reply(400, {"ok": False, "error": "слишком большой или пустой запрос"})
        try:
            data = json.loads(raw)
        except Exception:
            return self._reply(400, {"ok": False, "error": "bad json"})
        if not isinstance(data, dict) or "languages" not in data or "pricing" not in data:
            return self._reply(400, {"ok": False, "error": "структура контента не распознана"})
        try:
            stamp = save_content(data)
        except Exception as err:
            print(f"save error: {type(err).__name__}", flush=True)
            return self._reply(500, {"ok": False, "error": "не удалось сохранить"})
        self._reply(200, {"ok": True, "savedAs": stamp, "updatedAt": data["updatedAt"]})

    def _handle_upload(self) -> None:
        if not self._require_auth():
            return
        raw = self._read_body(MAX_UPLOAD)
        if raw is None:
            return self._reply(400, {"ok": False, "error": "файл пустой или больше 8 МБ"})
        kind = detect_image(raw)
        if not kind:
            return self._reply(400, {"ok": False, "error": "нужен файл JPEG, PNG или WebP"})
        try:
            url = store_image(raw, kind[0])
        except Exception as err:
            print(f"upload error: {type(err).__name__}", flush=True)
            return self._reply(500, {"ok": False, "error": "не удалось сохранить файл"})
        self._reply(200, {"ok": True, "url": url})

    def _handle_restore(self) -> None:
        if not self._require_auth():
            return
        raw = self._read_body(4096)
        if raw is None:
            return self._reply(400, {"ok": False, "error": "bad length"})
        try:
            version_id = json.loads(raw).get("id", "")
        except Exception:
            return self._reply(400, {"ok": False, "error": "bad json"})
        if not re.fullmatch(r"\d{8}-\d{6}", str(version_id)):
            return self._reply(400, {"ok": False, "error": "неизвестная версия"})
        source = HISTORY_DIR / f"content-{version_id}.json"
        if not source.exists():
            return self._reply(404, {"ok": False, "error": "версия не найдена"})
        try:
            data = json.loads(source.read_text(encoding="utf-8"))
            save_content(data)
        except Exception:
            return self._reply(500, {"ok": False, "error": "не удалось восстановить"})
        self._reply(200, {"ok": True})

    def log_message(self, fmt, *args):
        # без тел запросов: в них персональные данные
        print(f"{self.command} {self.path} -> {args[1] if len(args) > 1 else '?'}", flush=True)


if __name__ == "__main__":
    ensure_dirs()
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
