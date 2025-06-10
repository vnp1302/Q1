/**
 * API Type Definitions
 * تعاریف نوع برای API های پروژه
 */

// Base API Types
export interface ApiRequest {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  url: string
  headers?: Record<string, string>
  params?: Record<string, any>
  data?: any
  timeout?: number
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: ApiError
  meta?: ApiMeta
  timestamp: string
  requestId: string
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  stack?: string
  statusCode: number
}

export interface ApiMeta {
  page?: number
  limit?: number
  total?: number
  hasMore?: boolean
  nextCursor?: string
  prevCursor?: string
}

// Authentication API Types
export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
  deviceId?: string
  captcha?: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
}

export interface LoginResponse {
  user: User
  tokens: AuthTokens
  requiresTwoFactor?: boolean
  twoFactorMethods?: TwoFactorMethod[]
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
  agreeToTerms: boolean
  referralCode?: string
  captcha?: string
}

export interface RegisterResponse {
  user: Partial<User>
  verificationRequired: boolean
  verificationMethods: string[]
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType: "Bearer"
}

export interface TwoFactorMethod {
  type: "totp" | "sms" | "email" | "webauthn" | "biometric"
  enabled: boolean
  verified: boolean
  lastUsed?: string
}

export interface VerifyTwoFactorRequest {
  code: string
  method: string
  deviceId?: string
}

export interface WebAuthnRegistrationRequest {
  deviceName: string
  credentialCreationOptions: PublicKeyCredentialCreationOptions
}

export interface WebAuthnAuthenticationRequest {
  credentialRequestOptions: PublicKeyCredentialRequestOptions
}

// Wallet API Types
export interface TokenBalance {
  token: string
  balance: number
}

export interface WalletBalanceResponse {
  balances: TokenBalance[]
  totalValue: number
  change24h: number
  lastUpdated: string
}

export interface SendTokenRequest {
  to: string
  amount: string
  token: string
  memo?: string
  priority?: "low" | "medium" | "high"
}

export interface SendTokenResponse {
  transactionId: string
  hash: string
  status: "pending" | "confirmed"
  estimatedConfirmationTime: number
  fee: string
}

export interface TransactionHistoryRequest {
  page?: number
  limit?: number
  type?: string[]
  status?: string[]
  token?: string
  startDate?: string
  endDate?: string
}

export interface Transaction {
  id: string
  amount: number
}

export interface TransactionHistoryResponse {
  transactions: Transaction[]
  summary: {
    totalTransactions: number
    totalSent: number
    totalReceived: number
    totalFees: number
  }
}

// Trading API Types
export interface TradingPair {
  id: string
  name: string
}

export interface TradingPairsResponse {
  pairs: TradingPair[]
  lastUpdated: string
}

export interface OrderBookRequest {
  pair: string
  depth?: number
}

export interface OrderBookResponse {
  bids: [string, string][] // [price, amount]
  asks: [string, string][] // [price, amount]
  lastUpdated: string
}

export interface PlaceOrderRequest {
  pair: string
  type: "market" | "limit" | "stop"
  side: "buy" | "sell"
  amount: string
  price?: string
  stopPrice?: string
  timeInForce?: "GTC" | "IOC" | "FOK"
}

export interface PlaceOrderResponse {
  orderId: string
  status: "pending" | "filled" | "partial"
  filledAmount?: string
  remainingAmount?: string
  averagePrice?: string
}

export interface OrderHistoryRequest {
  page?: number
  limit?: number
  pair?: string
  status?: string[]
  startDate?: string
  endDate?: string
}

export interface Order {
  id: string
  amount: number
}

export interface OrderHistoryResponse {
  orders: Order[]
  summary: {
    totalOrders: number
    totalVolume: number
    successRate: number
  }
}

// Staking API Types
export interface StakingPool {
  id: string
  name: string
  apy: number
  lockPeriods: number[]
  tokens: string[]
}

export interface StakingPoolsResponse {
  pools: StakingPool[]
  totalValueLocked: string
  averageApy: number
}

export interface StakeRequest {
  poolId: string
  amount: string
  lockPeriod?: number
}

export interface StakeResponse {
  positionId: string
  transactionId: string
  estimatedRewards: string
  maturityDate: string
}

export interface UnstakeRequest {
  positionId: string
  amount?: string // partial unstaking
}

export interface UnstakeResponse {
  transactionId: string
  unstakeAmount: string
  penalty?: string
  estimatedReceiveDate: string
}

export interface StakingPosition {
  id: string
  poolId: string
  amount: string
  rewards: string
  maturityDate: string
}

export interface StakingPositionsResponse {
  positions: StakingPosition[]
  totalStaked: string
  totalRewards: string
  pendingRewards: string
}

// Bridge API Types
export interface BridgeChain {
  id: string
  name: string
  chainId: number
  rpcUrl: string
  nativeCurrency: string
}

export interface BridgeChainsResponse {
  chains: BridgeChain[]
  supportedTokens: string[]
}

export interface BridgeQuoteRequest {
  fromChain: string
  toChain: string
  token: string
  amount: string
}

export interface BridgeQuoteResponse {
  estimatedReceiveAmount: string
  fee: string
  estimatedTime: number
  route: BridgeRoute[]
  priceImpact: number
}

export interface BridgeRoute {
  step: number
  action: string
  fromChain: string
  toChain: string
  protocol: string
  estimatedTime: number
}

export interface BridgeTransferRequest {
  fromChain: string
  toChain: string
  token: string
  amount: string
  recipient: string
  slippage?: number
}

export interface BridgeTransfer {
  id: string
  fromChain: string
  toChain: string
  token: string
  amount: string
  recipient: string
  status: string
}

export interface BridgeTransferResponse {
  transferId: string
  transactionHash: string
  status: "pending" | "processing" | "completed"
  estimatedCompletionTime: number
  trackingUrl: string
}

export interface BridgeHistoryRequest {
  page?: number
  limit?: number
  status?: string[]
  fromChain?: string
  toChain?: string
  startDate?: string
  endDate?: string
}

export interface BridgeHistoryResponse {
  transfers: BridgeTransfer[]
  summary: {
    totalTransfers: number
    totalVolume: number
    successRate: number
  }
}

// Analytics API Types
export interface PortfolioAnalyticsResponse {
  totalValue: number
  change24h: number
  change7d: number
  change30d: number
  allocation: AssetAllocation[]
  performance: PerformanceData[]
  riskMetrics: RiskMetrics
}

export interface AssetAllocation {
  token: string
  percentage: number
  value: number
  change24h: number
}

export interface PerformanceData {
  date: string
  value: number
  pnl: number
  pnlPercentage: number
}

export interface RiskMetrics {
  volatility: number
  sharpeRatio: number
  maxDrawdown: number
  beta: number
  var95: number // Value at Risk 95%
}

export interface TradingAnalyticsResponse {
  totalTrades: number
  winRate: number
  totalPnl: number
  averageHoldTime: number
  bestTrade: TradeMetrics
  worstTrade: TradeMetrics
  monthlyPerformance: MonthlyPerformance[]
}

export interface TradeMetrics {
  pair: string
  pnl: number
  pnlPercentage: number
  holdTime: number
  date: string
}

export interface MonthlyPerformance {
  month: string
  trades: number
  pnl: number
  winRate: number
}

// Settings API Types
export interface UpdateProfileRequest {
  firstName?: string
  lastName?: string
  phone?: string
  avatar?: string
  bio?: string
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
}

export interface UpdatePreferencesRequest {
  language?: "en" | "fa" | "ar" | "zh"
  theme?: "light" | "dark" | "system"
  currency?: string
  timezone?: string
  notifications?: Partial<NotificationSettings>
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export type WebAuthnCredential = {}

export type TrustedDevice = {}

export type LoginHistory = {}

export interface SecuritySettingsResponse {
  twoFactorEnabled: boolean
  biometricEnabled: boolean
  webauthnCredentials: WebAuthnCredential[]
  trustedDevices: TrustedDevice[]
  activeSessions: ActiveSession[]
  loginHistory: LoginHistory[]
}

export interface ActiveSession {
  id: string
  deviceName: string
  deviceType: string
  ipAddress: string
  location?: string
  current: boolean
  createdAt: string
  lastActivity: string
}

// Notification API Types
export interface NotificationResponse {
  notifications: Notification[]
  unreadCount: number
}

export interface Notification {
  id: string
  type: "security" | "trading" | "system" | "marketing"
  title: string
  message: string
  read: boolean
  priority: "low" | "medium" | "high" | "critical"
  actionUrl?: string
  createdAt: string
}

export interface MarkNotificationReadRequest {
  notificationIds: string[]
}

// System API Types
export interface SystemStatusResponse {
  status: "operational" | "degraded" | "maintenance"
  services: ServiceStatus[]
  lastUpdated: string
}

export interface ServiceStatus {
  name: string
  status: "operational" | "degraded" | "down"
  responseTime: number
  uptime: number
}

export interface MaintenanceScheduleResponse {
  scheduled: MaintenanceWindow[]
  ongoing: MaintenanceWindow[]
}

export interface MaintenanceWindow {
  id: string
  title: string
  description: string
  startTime: string
  endTime: string
  affectedServices: string[]
  status: "scheduled" | "ongoing" | "completed"
}

// Error Types
export interface ValidationError {
  field: string
  message: string
  code: string
}

export interface RateLimitError {
  retryAfter: number
  limit: number
  remaining: number
  resetTime: string
}

export interface AuthenticationError {
  code: "INVALID_CREDENTIALS" | "ACCOUNT_LOCKED" | "TOKEN_EXPIRED" | "TWO_FACTOR_REQUIRED"
  message: string
  details?: {
    attemptsRemaining?: number
    lockoutDuration?: number
    twoFactorMethods?: string[]
  }
}

// WebSocket API Types
export interface WebSocketMessage<T = any> {
  type: string
  data: T
  timestamp: string
  id: string
}

export interface SubscriptionRequest {
  type: "subscribe" | "unsubscribe"
  channels: string[]
  auth?: string
}

export interface PriceUpdateMessage {
  pair: string
  price: number
  change24h: number
  volume24h: number
  timestamp: string
}

export interface OrderUpdateMessage {
  orderId: string
  status: string
  filledAmount?: string
  remainingAmount?: string
  averagePrice?: string
  timestamp: string
}

export interface BalanceUpdateMessage {
  token: string
  balance: string
  available: string
  locked: string
  timestamp: string
}
