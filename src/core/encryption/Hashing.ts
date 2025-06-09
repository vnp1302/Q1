import crypto from "crypto"
import bcrypt from "bcryptjs"

export class HashingService {
  private readonly saltRounds = 12

  /**
   * Hash password using bcrypt
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds)
  }

  /**
   * Verify password against hash
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  /**
   * Generate SHA-256 hash
   */
  sha256(data: string): string {
    return crypto.createHash("sha256").update(data).digest("hex")
  }

  /**
   * Generate SHA-512 hash
   */
  sha512(data: string): string {
    return crypto.createHash("sha512").update(data).digest("hex")
  }

  /**
   * Generate HMAC signature
   */
  hmacSha256(data: string, secret: string): string {
    return crypto.createHmac("sha256", secret).update(data).digest("hex")
  }

  /**
   * Generate secure random salt
   */
  generateSalt(length = 32): string {
    return crypto.randomBytes(length).toString("hex")
  }

  /**
   * Generate PBKDF2 key derivation
   */
  async deriveKey(password: string, salt: string, iterations = 100000): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, iterations, 32, "sha256", (err, derivedKey) => {
        if (err) reject(err)
        else resolve(derivedKey)
      })
    })
  }

  /**
   * Generate secure API key
   */
  generateApiKey(): string {
    const timestamp = Date.now().toString()
    const random = crypto.randomBytes(16).toString("hex")
    return this.sha256(timestamp + random)
  }

  /**
   * Verify data integrity with checksum
   */
  verifyChecksum(data: string, expectedChecksum: string): boolean {
    const actualChecksum = this.sha256(data)
    return crypto.timingSafeEqual(Buffer.from(actualChecksum, "hex"), Buffer.from(expectedChecksum, "hex"))
  }
}

export const hashingService = new HashingService()
