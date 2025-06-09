#!/bin/bash

echo "🔍 Starting comprehensive security check..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi

# Install security tools if not present
echo "📦 Installing security tools..."
npm install -g audit-ci retire snyk

# NPM Audit
echo "🔍 Running NPM Audit..."
if npm audit --audit-level=moderate; then
    print_status "NPM Audit passed"
else
    print_warning "NPM Audit found vulnerabilities"
fi

# Retire.js check
echo "🔍 Running Retire.js..."
if retire --js --node; then
    print_status "Retire.js check passed"
else
    print_warning "Retire.js found vulnerabilities"
fi

# Snyk check (if token is available)
if [ ! -z "$SNYK_TOKEN" ]; then
    echo "🔍 Running Snyk..."
    if snyk test --severity-threshold=high; then
        print_status "Snyk check passed"
    else
        print_warning "Snyk found vulnerabilities"
    fi
else
    print_warning "SNYK_TOKEN not set, skipping Snyk check"
fi

# License check
echo "🔍 Checking licenses..."
if npx license-checker --onlyAllow 'MIT;Apache-2.0;BSD-2-Clause;BSD-3-Clause;ISC' --excludePrivatePackages; then
    print_status "License check passed"
else
    print_error "License check failed"
fi

echo "🎉 Security check completed!"
