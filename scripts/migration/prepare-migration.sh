#!/bin/bash

echo "🔄 شروع فرآیند ارتقای امنیتی..."

# ایجاد backup از پروژه فعلی
echo "📦 ایجاد backup..."
cp -r . ../Q2-backup-$(date +%Y%m%d_%H%M%S)

# ایجاد ساختار پوشه‌های جدید
echo "📁 ایجاد ساختار پوشه‌های امنیتی..."

# ساختار اصلی
mkdir -p .env.secure/{production,development,test}
mkdir -p .husky
mkdir -p .github/{workflows}
mkdir -p public/.well-known
mkdir -p src/core/{auth/{biometric,jwt/refresh-token,otp,session,webauthn},encryption,firewall,logging,monitoring,compliance}
mkdir -p src/modules/trading/{validators,api/{middleware,routes/{encrypted,public}},lib/{secure-sockets,exchange},compliance}
mkdir -p src/monitoring/{siem,behavioral}
mkdir -p tests/security/{penetration/{api,auth},vulnerability,compliance}
mkdir -p scripts/security/{vault,monitoring,certs,incident-response}
mkdir -p scripts/container-security
mkdir -p docker/security/{apparmor,seccomp,selinux,rootless}
mkdir -p docker/compose
mkdir -p certs/{ca,issued,revoked}
mkdir -p docs/{security,compliance}

echo "✅ ساختار پوشه‌ها ایجاد شد"
