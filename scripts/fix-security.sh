#!/bin/bash

echo "🔍 Checking security vulnerabilities..."

# بررسی audit
npm audit

echo "🔧 Attempting to fix security issues..."

# تلاش برای رفع خودکار
npm audit fix

# اگر هنوز مشکل دارد، force fix
if [ $? -ne 0 ]; then
    echo "⚠️  Running force fix (may cause breaking changes)..."
    npm audit fix --force
fi

echo "✅ Security fix completed!"
echo "🔍 Running final security check..."
npm audit
