import type { SecurityConfig } from "./types/security"

export const securityConfig: SecurityConfig = {
  encryption: {
    algorithm: "aes-256-gcm",
    keySize: 32,
    ivSize: 16,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || "fallback-secret-change-in-production",
    jwtExpiry: "15m",
    refreshTokenExpiry: "7d",
    otpWindow: 30,
    maxLoginAttempts: 5,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
  },
  monitoring: {
    logLevel: process.env.LOG_LEVEL || "info",
    alertThreshold: 5,
  },
}

export const SECURITY_HEADERS = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
}
