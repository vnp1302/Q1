import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { promisify } from 'util';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  permissions: string[];
  sessionId: string;
  iat?: number;
  exp?: number;
  jti?: string;
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface JwtConfig {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
  issuer: string;
  audience: string;
  algorithm: 'RS512';
}

class JwtService {
  private config: JwtConfig;
  private blacklistedTokens: Set<string> = new Set();
  private readonly ALGORITHM = 'RS512';

  constructor() {
    this.config = {
      accessTokenSecret: process.env.JWT_ACCESS_SECRET || this.generateSecret(),
      refreshTokenSecret: process.env.JWT_REFRESH_SECRET || this.generateSecret(),
      accessTokenExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
      refreshTokenExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
      issuer: process.env.JWT_ISSUER || 'q2-platform',
      audience: process.env.JWT_AUDIENCE || 'q2-users',
      algorithm: 'RS512'
    };

    // Validate configuration
    this.validateConfig();
  }

  /**
   * Generate RS512 token pair for user authentication
   */
  async generateTokenPair(payload: Omit<JwtPayload, 'iat' | 'exp' | 'jti'>): Promise<TokenPair> {
    try {
      const sessionId = this.generateSessionId();
      const jwtId = this.generateJwtId();
      
      const enhancedPayload: JwtPayload = {
        ...payload,
        sessionId,
        jti: jwtId
      };

      // Generate access token
      const accessToken = jwt.sign(enhancedPayload, this.config.accessTokenSecret, {
        algorithm: this.ALGORITHM,
        expiresIn: this.config.accessTokenExpiry,
        issuer: this.config.issuer,
        audience: this.config.audience,
        jwtid: jwtId
      });

      // Generate refresh token with limited payload
      const refreshPayload = {
        userId: payload.userId,
        sessionId,
        type: 'refresh'
      };

      const refreshToken = jwt.sign(refreshPayload, this.config.refreshTokenSecret, {
        algorithm: this.ALGORITHM,
        expiresIn: this.config.refreshTokenExpiry,
        issuer: this.config.issuer,
        audience: this.config.audience
      });

      return {
        accessToken,
        refreshToken,
        expiresIn: this.getExpiryInSeconds(this.config.accessTokenExpiry)
      };
    } catch (error) {
      throw new Error(`Token generation failed: ${error.message}`);
    }
  }

  /**
   * Verify and decode access token
   */
  async verifyAccessToken(token: string): Promise<JwtPayload> {
    try {
      // Check if token is blacklisted
      if (this.blacklistedTokens.has(token)) {
        throw new Error('Token has been invalidated');
      }

      const decoded = jwt.verify(token, this.config.accessTokenSecret, {
        algorithms: [this.ALGORITHM],
        issuer: this.config.issuer,
        audience: this.config.audience
      }) as JwtPayload;

      // Additional security checks
      if (!decoded.jti || !decoded.sessionId) {
        throw new Error('Invalid token structure');
      }

      return decoded;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Access token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid access token');
      }
      throw error;
    }
  }

  /**
   * Verify refresh token
   */
  async verifyRefreshToken(token: string): Promise<{ userId: string; sessionId: string }> {
    try {
      const decoded = jwt.verify(token, this.config.refreshTokenSecret, {
        algorithms: [this.ALGORITHM],
        issuer: this.config.issuer,
        audience: this.config.audience
      }) as any;

      if (decoded.type !== 'refresh') {
        throw new Error('Invalid refresh token type');
      }

      return {
        userId: decoded.userId,
        sessionId: decoded.sessionId
      };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Refresh token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid refresh token');
      }
      throw error;
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(refreshToken: string, userPayload: Omit<JwtPayload, 'iat' | 'exp' | 'jti' | 'sessionId'>): Promise<TokenPair> {
    try {
      const { userId, sessionId } = await this.verifyRefreshToken(refreshToken);
      
      if (userId !== userPayload.userId) {
        throw new Error('User ID mismatch');
      }

      // Generate new token pair with existing session ID
      return this.generateTokenPair({
        ...userPayload,
        sessionId
      });
    } catch (error) {
      throw new Error(`Token refresh failed: ${error.message}`);
    }
  }

  /**
   * Invalidate token (add to blacklist)
   */
  async invalidateToken(token: string): Promise<void> {
    try {
      const decoded = jwt.decode(token) as JwtPayload;
      if (decoded && decoded.jti) {
        this.blacklistedTokens.add(token);
        
        // In production, store in Redis with TTL
        // await this.storeBlacklistedToken(decoded.jti, decoded.exp);
      }
    } catch (error) {
      // Log error but don't throw - invalidation should be non-blocking
      console.error('Token invalidation warning:', error.message);
    }
  }

  /**
   * Invalidate all tokens for a session
   */
  async invalidateSession(sessionId: string): Promise<void> {
    // In production, implement session-based invalidation
    // This would require storing active sessions in Redis
    console.log(`Invalidating session: ${sessionId}`);
  }

  /**
   * Get token expiry time in seconds
   */
  private getExpiryInSeconds(expiry: string): number {
    const unit = expiry.slice(-1);
    const value = parseInt(expiry.slice(0, -1));
    
    switch (unit) {
      case 's': return value;
      case 'm': return value * 60;
      case 'h': return value * 3600;
      case 'd': return value * 86400;
      default: return 900; // Default 15 minutes
    }
  }

  /**
   * Generate cryptographically secure secret
   */
  private generateSecret(): string {
    return crypto.randomBytes(64).toString('hex');
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Generate unique JWT ID
   */
  private generateJwtId(): string {
    return crypto.randomUUID();
  }

  /**
   * Validate JWT configuration
   */
  private validateConfig(): void {
    if (!this.config.accessTokenSecret || this.config.accessTokenSecret.length < 32) {
      throw new Error('JWT access token secret must be at least 32 characters');
    }
    
    if (!this.config.refreshTokenSecret || this.config.refreshTokenSecret.length < 32) {
      throw new Error('JWT refresh token secret must be at least 32 characters');
    }

    if (this.config.accessTokenSecret === this.config.refreshTokenSecret) {
      throw new Error('Access and refresh token secrets must be different');
    }
  }

  /**
   * Extract token from Authorization header
   */
  static extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }

  /**
   * Get token expiry date
   */
  getTokenExpiry(token: string): Date | null {
    try {
      const decoded = jwt.decode(token) as JwtPayload;
      return decoded && decoded.exp ? new Date(decoded.exp * 1000) : null;
    } catch {
      return null;
    }
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token: string): boolean {
    const expiry = this.getTokenExpiry(token);
    return expiry ? expiry < new Date() : true;
  }
}

export default JwtService;
export type { JwtPayload, TokenPair };
