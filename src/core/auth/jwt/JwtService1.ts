import jwt from "jsonwebtoken"
import { securityConfig } from "../../../security-config"
import { hashingService } from "../../encryption/Hashing"

export interface JwtPayload {
  userId: string
  email: string
  roles: string[]
  permissions: string[]
  sessionId: string
  iat?: number
  exp?: number
}

export class JwtService {
  private readonly secret = securityConfig.auth.jwtSecret
  private readonly accessTokenExpiry = securityConfig.auth.jwtExpiry
  private readonly refreshTokenExpiry = securityConfig.auth.refreshTokenExpiry

  /**
   * Generate access token
   */
  generateAccessToken(payload: Omit<JwtPayload, "iat" | "exp">): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.accessTokenExpiry,
      issuer: "Q2-Platform",
      audience: "Q2-Users",
    })
  }

  /**
   * Generate refresh token
   */
  generateRefreshToken(userId: string, sessionId: string): string {
    const payload = {
      userId,
      sessionId,
      type: "refresh",
    }

    return jwt.sign(payload, this.secret, {
      expiresIn: this.refreshTokenExpiry,
      issuer: "Q2-Platform",
      audience: "Q2-Users",
    })
  }

  /**
   * Verify and decode token
   */
  verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.secret, {
        issuer: "Q2-Platform",
        audience: "Q2-Users",
      }) as JwtPayload
    } catch (error) {
      throw new Error("Invalid or expired token")
    }
  }

  /**
   * Generate secure session token for trading
   */
  generateTradingSessionToken(userId: string, exchangeId: string, permissions: string[]): string {
    const payload = {
      userId,
      exchangeId,
      permissions,
      type: "trading-session",
      sessionId: hashingService.generateApiKey(),
    }

    return jwt.sign(payload, this.secret, {
      expiresIn: "1h", // Trading sessions expire quickly
      issuer: "Q2-Platform",
      audience: "Q2-Trading",
    })
  }

  /**
   * Decode token without verification (for expired token analysis)
   */
  decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload
    } catch (error) {
      return null
    }
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token)
    if (!decoded || !decoded.exp) return true

    return Date.now() >= decoded.exp * 1000
  }

  /**
   * Generate token with custom claims for compliance
   */
  generateComplianceToken(userId: string, complianceLevel: string, restrictions: string[]): string {
    const payload = {
      userId,
      complianceLevel,
      restrictions,
      type: "compliance",
      sessionId: hashingService.generateApiKey(),
    }

    return jwt.sign(payload, this.secret, {
      expiresIn: "24h",
      issuer: "Q2-Platform",
      audience: "Q2-Compliance",
    })
  }
}

export const jwtService = new JwtService()
