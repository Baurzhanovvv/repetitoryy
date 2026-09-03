# lead-proxy — приём заявок с лендинга

Форма на сайте шлёт `POST /api/lead`, этот сервис валидирует данные
и пересылает их в Telegram. Токен бота живёт здесь, на сервере, и в
браузер не попадает — раньше он был вписан во фронтенд и уезжал в
JS-бандл, доступный любому посетителю.

## Что где

| Файл | Куда ставится |
|---|---|
| `lead-proxy.py` | `/opt/lead-proxy/server.py` |
| `lead-proxy.service` | `/etc/systemd/system/lead-proxy.service` |
| секреты | `/etc/lead-proxy.env`, права `600`, в репозиторий не попадает |

## /etc/lead-proxy.env

```
TELEGRAM_BOT_TOKEN=<токен от @BotFather>
TELEGRAM_CHAT_ID=<id чата или группы>
PORT=8081
LEAD_TZ=Asia/Almaty
```

**Файл читается только при старте.** После любой правки:

```
systemctl restart lead-proxy
```

## Установка с нуля

```
useradd --system --no-create-home --shell /usr/sbin/nologin leadproxy
mkdir -p /opt/lead-proxy
# скопировать lead-proxy.py -> /opt/lead-proxy/server.py
# скопировать lead-proxy.service -> /etc/systemd/system/
# создать /etc/lead-proxy.env, chmod 600
systemctl daemon-reload && systemctl enable --now lead-proxy
```

В nginx, в блоке сайта:

```nginx
location = /api/lead {
    limit_except POST { deny all; }
    proxy_pass http://127.0.0.1:8081;
    proxy_set_header X-Real-IP $remote_addr;
    client_max_body_size 8k;
}
```

## Проверка

```
systemctl is-active lead-proxy
journalctl -u lead-proxy -n 30 --no-pager   # персональных данных в логах нет
curl -s -X POST https://repetitoryadom.kz/api/lead \
  -H 'Content-Type: application/json' \
  -d '{"childName":"тест","phone":"+7 700 000-00-00"}'
```

Ошибка `chat not found` означает, что бот не состоит в целевой группе —
добавьте его туда и повторите.

## Защита

- слушает только `127.0.0.1`, наружу торчит один `POST /api/lead`
- обязательны `childName` и `phone`, длины полей ограничены
- ввод экранируется, сообщение уходит с `parse_mode=HTML`
- не больше 5 заявок с одного адреса за 10 минут
- systemd: отдельный пользователь, `ProtectSystem=strict`, лимит памяти 128M
