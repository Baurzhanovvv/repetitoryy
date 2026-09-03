#!/usr/bin/env python3
"""
Приём заявок с лендинга и пересылка в Telegram.

Токен бота живёт здесь, на сервере, и в браузер не попадает.
Слушает только localhost — наружу его проксирует nginx на /api/lead.
"""

import html
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from collections import deque
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from zoneinfo import ZoneInfo

# Сервер живёт в UTC, а школа в Алматы — время в заявке ставим местное,
# иначе в чате оно выглядит на 5 часов раньше реального.
LOCAL_TZ = ZoneInfo(os.environ.get("LEAD_TZ", "Asia/Almaty"))

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "").strip()
CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "").strip()
PORT = int(os.environ.get("PORT", "8081"))

if not BOT_TOKEN or not CHAT_ID:
    sys.exit("TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID должны быть заданы")

MAX_BODY = 8 * 1024
RATE_LIMIT = 5           # заявок
RATE_WINDOW = 600        # за 10 минут с одного адреса

FIELDS = {
    "childName": 100,
    "age": 20,
    "phone": 40,
    "time": 120,
    "language": 40,
    "source": 60,
}

_hits: dict[str, deque] = {}


def rate_limited(ip: str) -> bool:
    now = time.monotonic()
    q = _hits.setdefault(ip, deque())
    while q and now - q[0] > RATE_WINDOW:
        q.popleft()
    if len(q) >= RATE_LIMIT:
        return True
    q.append(now)
    if len(_hits) > 2000:                      # чтобы память не росла бесконечно
        for k in [k for k, v in _hits.items() if not v]:
            _hits.pop(k, None)
    return False


def clean(value, limit: int) -> str:
    if not isinstance(value, str):
        return ""
    value = re.sub(r"[\x00-\x1f\x7f]", " ", value).strip()
    return value[:limit]


def build_message(data: dict) -> str:
    e = lambda s: html.escape(s, quote=False)
    lines = [
        "🎓 <b>Новая заявка на пробный урок</b>",
        "",
        f"👤 <b>Имя ребёнка:</b> {e(data['childName'])}",
        f"🎂 <b>Возраст:</b> {e(data['age'])}",
        f"📱 <b>Телефон:</b> {e(data['phone'])}",
    ]
    if data.get("time"):
        lines.append(f"⏰ <b>Удобное время:</b> {e(data['time'])}")
    if data.get("language"):
        lines.append(f"🌐 <b>Язык:</b> {e(data['language'])}")
    if data.get("source"):
        lines.append(f"📍 <b>Источник:</b> {e(data['source'])}")
    lines.append("")
    lines.append(f"📅 {datetime.now(LOCAL_TZ).strftime('%d.%m.%Y %H:%M')} (Алматы)")
    return "\n".join(lines)


def send_to_telegram(text: str) -> bool:
    payload = json.dumps({
        "chat_id": CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }).encode()
    req = urllib.request.Request(
        f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read()).get("ok", False)
    except urllib.error.HTTPError as err:
        # тело ответа Telegram может содержать токен в описании — не логируем целиком
        print(f"telegram http {err.code}", flush=True)
    except Exception as err:
        print(f"telegram error: {type(err).__name__}", flush=True)
    return False


class Handler(BaseHTTPRequestHandler):
    server_version = "lead-proxy"
    sys_version = ""

    def _reply(self, code: int, payload: dict) -> None:
        body = json.dumps(payload).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self) -> None:
        if self.path.rstrip("/") != "/api/lead":
            return self._reply(404, {"ok": False, "error": "not found"})

        ip = self.headers.get("X-Real-IP", self.client_address[0])
        if rate_limited(ip):
            return self._reply(429, {"ok": False, "error": "too many requests"})

        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            return self._reply(400, {"ok": False, "error": "bad length"})
        if length <= 0 or length > MAX_BODY:
            return self._reply(400, {"ok": False, "error": "bad length"})

        try:
            raw = self.rfile.read(length)
            data = json.loads(raw)
            if not isinstance(data, dict):
                raise ValueError
        except Exception:
            return self._reply(400, {"ok": False, "error": "bad json"})

        cleaned = {key: clean(data.get(key), limit) for key, limit in FIELDS.items()}
        if not cleaned["childName"] or not cleaned["phone"]:
            return self._reply(400, {"ok": False, "error": "childName и phone обязательны"})

        if send_to_telegram(build_message(cleaned)):
            return self._reply(200, {"ok": True})
        return self._reply(502, {"ok": False, "error": "delivery failed"})

    def do_GET(self) -> None:
        if self.path.rstrip("/") == "/api/health":
            return self._reply(200, {"ok": True})
        self._reply(404, {"ok": False, "error": "not found"})

    def log_message(self, fmt, *args):
        # без тел запросов: в них персональные данные
        print(f"{self.command} {self.path} -> {args[1] if len(args) > 1 else '?'}", flush=True)


if __name__ == "__main__":
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
