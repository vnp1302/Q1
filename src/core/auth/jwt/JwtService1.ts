import jwt, { SignOptions } from "jsonwebtoken";
import { securityConfig } from "../../../security-config";
import { hashingService } from "../../encryption/Hashing";

export interface JwtPayload {
  userId: string;
  email: string;
  roles: string[];
  permissions: string[];
  sessionId: string;
  iat?: number;
  exp?: number;
}

export class JwtService {
  private readonly secret: jwt.Secret = securityConfig.auth.jwtSecret;
  
  // تبدیل مقادیر به number یا StringValue
  private readonly accessTokenExpiry: number = 
    typeof securityConfig.auth.jwtExpiry === 'string' 
      ? this.parseJwtExpiry(securityConfig.auth.jwtExpiry) 
      : securityConfig.auth.jwtExpiry;

  private readonly refreshTokenExpiry: number = 
    typeof securityConfig.auth.refreshTokenExpiry === 'string' 
      ? this.parseJwtExpiry(securityConfig.auth.refreshTokenExpiry) 
      : securityConfig.auth.refreshTokenExpiry;

  // تابع کمکی برای تبدیل رشته‌های زمانی به ثانیه
  private parseJwtExpiry(expiry: string): number {
    if (expiry.endsWith('d')) return parseInt(expiry) * 24 * 60 * 60;
    if (expiry.endsWith('h')) return parseInt(expiry) * 60 * 60;
    if (expiry.endsWith('m')) return parseInt(expiry) * 60;
    if (expiry.endsWith('s')) return parseInt(expiry);
    return parseInt(expiry);
  }

  /**
   * Generate access token
   */
  generateAccessToken(payload: Omit<JwtPayload, "iat" | "exp">): string {
    const options: SignOptions = {
      expiresIn: this.accessTokenExpiry,
      issuer: "Q2-Platform",
      audience: "Q2-Users",
    };
    return jwt.sign(payload, this.secret, options);
  }

  /**
   * Generate refresh token
   */
  generateRefreshToken(userId: string, sessionId: string): string {
    const payload = {
      userId,
      sessionId,
      type: "refresh",
    };

    const options: SignOptions = {
      expiresIn: this.refreshTokenExpiry,
      issuer: "Q2-Platform",
      audience: "Q2-Users",
    };
    return jwt.sign(payload, this.secret, options);
  }

  /**
   * Verify and decode token
   */
  verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.secret, {
        issuer: "Q2-Platform",
        audience: "Q2-Users",
      }) as JwtPayload;
    } catch (error) {
      throw new Error("Invalid or expired token");
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
    };

    const options: SignOptions = {
      expiresIn: 3600, // 1 hour in seconds
      issuer: "Q2-Platform",
      audience: "Q2-Trading",
    };
    return jwt.sign(payload, this.secret, options);
  }

  /**
   * Decode token without verification (for expired token analysis)
   */
  decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    return Date.now() >= decoded.exp * 1000;
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
    };

    const options: SignOptions = {
      expiresIn: 86400, // 24 hours in seconds
      issuer: "Q2-Platform",
      audience: "Q2-Compliance",
    };
    return jwt.sign(payload, this.secret, options);
  }
}

export const jwtService = new JwtService();
