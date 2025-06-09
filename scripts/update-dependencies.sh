#!/bin/bash

echo "🔍 Checking for outdated packages..."
npm outdated

echo "🛡️ Running security audit..."
npm audit --audit-level=moderate

echo "🔧 Attempting to fix vulnerabilities..."
npm audit fix

echo "📦 Updating dependencies..."
npm update

echo "🧹 Cleaning up..."
npm prune

echo "✅ Dependency update complete!"
