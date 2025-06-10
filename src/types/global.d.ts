import type React from "react"
/**
 * Global Type Definitions
 * تعاریف نوع سراسری برای پروژه Q2 Token Platform
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Database
      DATABASE_URL: string
      REDIS_URL: string

      // Authentication
      JWT_SECRET: string
      JWT_ISSUER: string
      NEXTAUTH_SECRET: string
      NEXTAUTH_URL: string

      // WebAuthn
      WEBAUTHN_RP_ID: string
      WEBAUTHN_RP_NAME: string
      WEBAUTHN_ORIGIN: string

      // Encryption
      ENCRYPTION_KEY: string
      KMS_KEY_ID: string

      // External Services
      SENTRY_DSN: string
      SENTRY_ORG: string
      SENTRY_PROJECT: string

      // Security
      CSP_NONCE_SECRET: string
      RATE_LIMIT_SECRET: string

      // Application
      NEXT_PUBLIC_APP_URL: string
      NEXT_PUBLIC_API_URL: string
      NODE_ENV: "development" | "production" | "test"

      // Monitoring
      OPENTELEMETRY_ENDPOINT: string
      LOG_LEVEL: "debug" | "info" | "warn" | "error"

      // Feature Flags
      ENABLE_BIOMETRIC_AUTH: string
      ENABLE_QUANTUM_CRYPTO: string
      ENABLE_ADVANCED_MONITORING: string
    }
  }

  interface Window {
    // WebAuthn
    PublicKeyCredential?: PublicKeyCredential

    // Biometric Authentication
    BiometricAuth?: {
      isAvailable(): Promise<boolean>
      authenticate(options: BiometricAuthOptions): Promise<BiometricAuthResult>
    }

    // Security
    trustedTypes?: TrustedTypePolicyFactory

    // Analytics (if enabled)
    gtag?: (...args: any[]) => void

    // Development
    __NEXT_DATA__?: any
  }
}

// Authentication Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  roles: UserRole[]
  preferences: UserPreferences
  securitySettings: SecuritySettings
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
}

export interface UserRole {
  id: string
  name: string
  permissions: Permission[]
}

export interface Permission {
  id: string
  resource: string
  action: string
  conditions?: Record<string, any>
}

export interface UserPreferences {
  language: "en" | "fa" | "ar" | "zh"
  theme: "light" | "dark" | "system"
  currency: string
  timezone: string
  notifications: NotificationSettings
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  security: boolean
  trading: boolean
  marketing: boolean
}

export interface SecuritySettings {
  twoFactorEnabled: boolean
  biometricEnabled: boolean
  webauthnCredentials: WebAuthnCredential[]
  trustedDevices: TrustedDevice[]
  loginHistory: LoginHistory[]
  securityQuestions: SecurityQuestion[]
}

// WebAuthn Types
export interface WebAuthnCredential {
  id: string
  credentialId: string
  publicKey: string
  counter: number
  deviceName: string
  createdAt: Date
  lastUsedAt?: Date
}

export interface BiometricAuthOptions {
  reason: string
  fallbackTitle?: string
  cancelTitle?: string
}

export interface BiometricAuthResult {
  success: boolean
  error?: string
  biometryType?: "TouchID" | "FaceID" | "Fingerprint"
}

// Security Types
export interface TrustedDevice {
  id: string
  deviceId: string
  deviceName: string
  deviceType: "mobile" | "desktop" | "tablet"
  userAgent: string
  ipAddress: string
  location?: string
  createdAt: Date
  lastUsedAt: Date
}

export interface LoginHistory {
  id: string
  ipAddress: string
  userAgent: string
  location?: string
  success: boolean
  method: "password" | "webauthn" | "biometric" | "otp"
  createdAt: Date
}

export interface SecurityQuestion {
  id: string
  question: string
  answerHash: string
  createdAt: Date
}

// API Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: ApiError
  meta?: {
    page?: number
    limit?: number
    total?: number
    hasMore?: boolean
  }
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: string
  requestId: string
}

// Wallet Types
export interface Wallet {
  id: string
  address: string
  type: "hot" | "cold" | "hardware"
  balance: TokenBalance[]
  transactions: Transaction[]
  createdAt: Date
  updatedAt: Date
}

export interface TokenBalance {
  tokenId: string
  symbol: string
  name: string
  balance: string
  decimals: number
  usdValue: number
  change24h: number
}

export interface Transaction {
  id: string
  hash: string
  type: "send" | "receive" | "swap" | "stake" | "unstake"
  status: "pending" | "confirmed" | "failed"
  amount: string
  token: string
  from: string
  to: string
  fee: string
  timestamp: Date
  blockNumber?: number
  confirmations?: number
}

// Trading Types
export interface TradingPair {
  id: string
  baseToken: string
  quoteToken: string
  price: number
  change24h: number
  volume24h: number
  high24h: number
  low24h: number
}

export interface Order {
  id: string
  type: "market" | "limit" | "stop"
  side: "buy" | "sell"
  amount: string
  price?: string
  status: "pending" | "filled" | "cancelled" | "expired"
  createdAt: Date
  updatedAt: Date
}

// Staking Types
export interface StakingPool {
  id: string
  name: string
  token: string
  apy: number
  totalStaked: string
  minStake: string
  lockPeriod: number
  rewards: string
  status: "active" | "inactive" | "maintenance"
}

export interface StakingPosition {
  id: string
  poolId: string
  amount: string
  rewards: string
  startDate: Date
  endDate?: Date
  status: "active" | "unstaking" | "completed"
}

// Bridge Types
export interface BridgeChain {
  id: string
  name: string
  symbol: string
  rpcUrl: string
  explorerUrl: string
  tokens: BridgeToken[]
  fees: BridgeFee[]
}

export interface BridgeToken {
  address: string
  symbol: string
  name: string
  decimals: number
  minAmount: string
  maxAmount: string
}

export interface BridgeFee {
  type: "fixed" | "percentage"
  amount: string
  token: string
}

export interface BridgeTransfer {
  id: string
  fromChain: string
  toChain: string
  token: string
  amount: string
  recipient: string
  status: "pending" | "processing" | "completed" | "failed"
  txHash?: string
  estimatedTime: number
  fee: string
  createdAt: Date
  updatedAt: Date
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// Component Props Types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
  "data-testid"?: string
}

export interface LoadingState {
  loading: boolean
  error?: string | null
}

export interface PaginationProps {
  page: number
  limit: number
  total: number
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
}

// Form Types
export interface FormFieldProps {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  helperText?: string
}

export interface ValidationRule {
  required?: boolean | string
  minLength?: number | { value: number; message: string }
  maxLength?: number | { value: number; message: string }
  pattern?: RegExp | { value: RegExp; message: string }
  validate?: (value: any) => boolean | string
}

// Theme Types
export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    danger: string
    warning: string
    success: string
    info: string
    background: string
    surface: string
    text: string
  }
  fonts: {
    sans: string[]
    mono: string[]
  }
  spacing: Record<string, string>
  borderRadius: Record<string, string>
  shadows: Record<string, string>
}
