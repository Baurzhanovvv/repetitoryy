# Бэкенд лендинга

Один сервис на две задачи:

1. **Заявки** — принимает `POST /api/lead` и пересылает в Telegram.
   Токен бота живёт здесь, на сервере, и в браузер не попадает.
2. **Админка** — правка контента сайта и загрузка картинок.

Слушает только `127.0.0.1`, наружу его проксирует nginx.

## Где что лежит

| Что | Путь |
|---|---|
| Код сервиса | `/opt/lead-proxy/server.py` |
| Утилита пароля | `/opt/lead-proxy/hash-password.py` |
| unit systemd | `/etc/systemd/system/lead-proxy.service` |
| Секреты | `/etc/lead-proxy.env`, права `600` |
| Контент сайта | `/var/www/content/content.json` |
| Картинки | `/var/www/content/uploads/` |
| История правок | `/var/www/content/history/` (последние 40) |

Каталог `/var/www/content` деплой сайта не трогает — статика лежит
отдельно, в `/var/www/repetitoryy`.

## /etc/lead-proxy.env

```
TELEGRAM_BOT_TOKEN=<токен от @BotFather>
TELEGRAM_CHAT_ID=<id чата или группы>
ADMIN_PASSWORD_HASH=<см. ниже>
PORT=8081
LEAD_TZ=Asia/Almaty
```

**Файл читается только при старте.** После правки:

```
systemctl restart lead-proxy
```

## Пароль администратора

```
python3 /opt/lead-proxy/hash-password.py
```

Пароль вводится скрыто и нигде не сохраняется — на экран выводится только
хэш (scrypt). Его вписать в `ADMIN_PASSWORD_HASH` и перезапустить сервис.
Пока хэш не задан, вход в админку отвечает 503.

## Эндпоинты

| Метод и путь | Доступ | Назначение |
|---|---|---|
| `POST /api/lead` | открыт | заявка с формы |
| `GET /api/health` | открыт | проверка живости |
| `POST /api/admin/login` | открыт | вход по паролю, ставит сессионную куку |
| `POST /api/admin/logout` | открыт | выход |
| `GET /api/admin/session` | открыт | проверить, есть ли вход |
| `POST /api/admin/content` | по сессии | сохранить контент |
| `POST /api/admin/upload` | по сессии | загрузить картинку |
| `GET /api/admin/versions` | по сессии | список сохранённых версий |
| `POST /api/admin/restore` | по сессии | откатиться к версии |

## Защита

- слушает только localhost
- пароль хранится хэшем (scrypt), сессия — в httpOnly + Secure куке, живёт 12 часов
- не больше 8 попыток входа с адреса за 15 минут, каждая попытка притормаживается
- не больше 5 заявок с адреса за 10 минут
- загрузка: только JPEG, PNG, WebP (проверяется по сигнатуре файла), не больше 8 МБ,
  картинка ужимается до 1400px по длинной стороне
- сохранение контента атомарное, предыдущая версия уходит в историю
- systemd: отдельный пользователь, `ProtectSystem=strict`, запись разрешена
  только в `/var/www/content`

## Проверка

```
systemctl is-active lead-proxy
journalctl -u lead-proxy -n 30 --no-pager    # персональных данных в логах нет

curl -s https://repetitoryadom.kz/api/health
curl -s https://repetitoryadom.kz/content.json | head -c 200
```

Ошибка `chat not found` при заявке означает, что бот не состоит в целевой
группе — добавьте его туда и повторите.

## Установка с нуля

```
useradd --system --no-create-home --shell /usr/sbin/nologin leadproxy
apt-get install -y python3-pil
mkdir -p /opt/lead-proxy /var/www/content/uploads /var/www/content/history
# скопировать server.py и hash-password.py -> /opt/lead-proxy/
# скопировать lead-proxy.service -> /etc/systemd/system/
# создать /etc/lead-proxy.env (chmod 600), задать хэш пароля
chown -R leadproxy:leadproxy /var/www/content
systemctl daemon-reload && systemctl enable --now lead-proxy
```

Блоки для nginx — в конфиге сайта: `location = /content.json`,
`location /uploads/` и `location /api/`.
