#!/usr/bin/env node

const { execSync } = require("child_process")
const path = require("path")

console.log("🔍 Running security-focused ESLint check...\n")

try {
  // Run ESLint with security config
  execSync("npx eslint . --ext .js,.jsx,.ts,.tsx --config .eslintrc.security.js --format=stylish", {
    stdio: "inherit",
    cwd: process.cwd(),
  })

  console.log("\n✅ Security ESLint check passed!")
} catch (error) {
  console.error("\n❌ Security ESLint check failed!")
  console.error("Please fix the security issues above before proceeding.")
  process.exit(1)
}
