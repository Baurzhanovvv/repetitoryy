#!/usr/bin/env python3
"""
Генерация хэша пароля для админки.

Запуск на сервере:
    python3 /opt/lead-proxy/hash-password.py

Пароль вводится скрыто и нигде не сохраняется — на экран выводится
только хэш, его нужно вписать в /etc/lead-proxy.env как
ADMIN_PASSWORD_HASH, после чего перезапустить сервис.
"""

import base64
import getpass
import hashlib
import secrets
import sys

password = getpass.getpass("Новый пароль администратора: ")
if len(password) < 10:
    sys.exit("Слишком короткий — нужно хотя бы 10 символов.")
if password != getpass.getpass("Повторите пароль: "):
    sys.exit("Пароли не совпали.")

salt = secrets.token_bytes(16)
digest = hashlib.scrypt(password.encode(), salt=salt, n=2**14, r=8, p=1, dklen=32)
print("\nВпишите в /etc/lead-proxy.env строку:\n")
print(f"ADMIN_PASSWORD_HASH=scrypt${base64.b64encode(salt).decode()}${base64.b64encode(digest).decode()}")
print("\nПотом: systemctl restart lead-proxy")
