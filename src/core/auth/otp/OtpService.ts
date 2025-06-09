import speakeasy from "speakeasy"
import { hashingService } from "../../encryption/Hashing"

export interface OtpSecret {
  secret: string
  qrCode: string
  backupCodes: string[]
}

export class OtpService {
  private readonly window = 1 // Allow 1 step tolerance
  private readonly step = 30 // 30-second window

  /**
   * Generate TOTP secret for user
   */
  generateSecret(userEmail: string): OtpSecret {
    const secret = speakeasy.generateSecret({
      name: `Q2 Platform (${userEmail})`,
      issuer: "Q2 Token Platform",
      length: 32,
    })

    const backupCodes = this.generateBackupCodes()

    return {
      secret: secret.base32,
      qrCode: secret.otpauth_url || "",
      backupCodes,
    }
  }

  /**
   * Verify TOTP token
   */
  verifyToken(token: string, secret: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
      window: this.window,
      step: this.step,
    })
  }

  /**
   * Generate backup codes
   */
  private generateBackupCodes(count = 10): string[] {
    const codes: string[] = []
    for (let i = 0; i < count; i++) {
      const code = Math.random().toString(36).substring(2, 10).toUpperCase()
      codes.push(code)
    }
    return codes
  }

  /**
   * Verify backup code
   */
  verifyBackupCode(code: string, hashedBackupCodes: string[]): boolean {
    const hashedCode = hashingService.sha256(code)
    return hashedBackupCodes.includes(hashedCode)
  }

  /**
   * Generate SMS OTP
   */
  generateSmsOtp(): { code: string; expiresAt: Date } {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes

    return { code, expiresAt }
  }

  /**
   * Generate email OTP
   */
  generateEmailOtp(): { code: string; expiresAt: Date } {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    return { code, expiresAt }
  }

  /**
   * Verify time-based OTP with replay protection
   */
  verifyWithReplayProtection(
    token: string,
    secret: string,
    lastUsedCounter: number,
  ): { valid: boolean; counter: number } {
    const currentCounter = Math.floor(Date.now() / 1000 / this.step)

    // Check if token is valid and not replayed
    if (currentCounter <= lastUsedCounter) {
      return { valid: false, counter: lastUsedCounter }
    }

    const isValid = this.verifyToken(token, secret)

    return {
      valid: isValid,
      counter: isValid ? currentCounter : lastUsedCounter,
    }
  }
}

export const otpService = new OtpService()
