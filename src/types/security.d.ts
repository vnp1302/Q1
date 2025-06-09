export interface SecurityConfig {
  encryption: {
    algorithm: string
    keySize: number
    ivSize: number
  }
  auth: {
    jwtSecret: string
    jwtExpiry: string
    refreshTokenExpiry: string
    otpWindow: number
    maxLoginAttempts: number
  }
  rateLimit: {
    windowMs: number
    maxRequests: number
  }
  monitoring: {
    logLevel: string
    alertThreshold: number
  }
}

export interface BiometricAuthData {
  userId: string
  biometricId: string
  publicKey: string
  counter: number
  createdAt: Date
}

export interface SecurityEvent {
  id: string
  type: "AUTH_FAILURE" | "INTRUSION_ATTEMPT" | "SUSPICIOUS_ACTIVITY" | "COMPLIANCE_VIOLATION"
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  userId?: string
  ipAddress: string
  userAgent: string
  timestamp: Date
  details: Record<string, any>
}

export interface TradingSession {
  sessionId: string
  userId: string
  exchangeId: string
  encryptedApiKey: string
  permissions: string[]
  expiresAt: Date
  ipWhitelist: string[]
}

export interface ComplianceRecord {
  id: string
  type: "GDPR" | "PCI_DSS" | "FINANCIAL_REGULATION"
  status: "COMPLIANT" | "NON_COMPLIANT" | "PENDING_REVIEW"
  details: Record<string, any>
  auditTrail: AuditEntry[]
  lastChecked: Date
}

export interface AuditEntry {
  timestamp: Date
  action: string
  userId: string
  ipAddress: string
  result: "SUCCESS" | "FAILURE"
  details: Record<string, any>
}
