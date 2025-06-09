#!/bin/bash

echo "🔐 راه‌اندازی Vault امنیتی..."

# ایجاد کلیدهای RSA برای JWT
openssl genrsa -out certs/jwt-private.pem 2048
openssl rsa -in certs/jwt-private.pem -pubout -out certs/jwt-public.pem

# ایجاد کلید رمزنگاری اصلی
openssl rand -hex 32 > .env.secure/.master-key

# تنظیم مجوزهای فایل
chmod 600 certs/jwt-private.pem
chmod 644 certs/jwt-public.pem
chmod 600 .env.secure/.master-key

echo "✅ Vault امنیتی راه‌اندازی شد"
