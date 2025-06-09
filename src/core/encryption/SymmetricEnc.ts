import crypto from "crypto"
import { securityConfig } from "../../security-config"

export class SymmetricEncryption {
  private readonly algorithm = securityConfig.encryption.algorithm
  private readonly keySize = securityConfig.encryption.keySize
  private readonly ivSize = securityConfig.encryption.ivSize

  /**
   * Generate a random encryption key
   */
  generateKey(): Buffer {
    return crypto.randomBytes(this.keySize)
  }

  /**
   * Encrypt data using AES-256-GCM
   */
  encrypt(data: string, key: Buffer): { encrypted: string; iv: string; tag: string } {
    const iv = crypto.randomBytes(this.ivSize)
    const cipher = crypto.createCipher(this.algorithm, key)
    cipher.setAAD(Buffer.from("Q2-Platform-Auth"))

    let encrypted = cipher.update(data, "utf8", "hex")
    encrypted += cipher.final("hex")

    const tag = cipher.getAuthTag()

    return {
      encrypted,
      iv: iv.toString("hex"),
      tag: tag.toString("hex"),
    }
  }

  /**
   * Decrypt data using AES-256-GCM
   */
  decrypt(encryptedData: string, key: Buffer, iv: string, tag: string): string {
    const decipher = crypto.createDecipher(this.algorithm, key)
    decipher.setAAD(Buffer.from("Q2-Platform-Auth"))
    decipher.setAuthTag(Buffer.from(tag, "hex"))

    let decrypted = decipher.update(encryptedData, "hex", "utf8")
    decrypted += decipher.final("utf8")

    return decrypted
  }

  /**
   * Encrypt sensitive trading data
   */
  encryptTradingData(data: any, key: Buffer): string {
    const jsonData = JSON.stringify(data)
    const { encrypted, iv, tag } = this.encrypt(jsonData, key)

    return Buffer.from(JSON.stringify({ encrypted, iv, tag })).toString("base64")
  }

  /**
   * Decrypt sensitive trading data
   */
  decryptTradingData(encryptedData: string, key: Buffer): any {
    const decoded = JSON.parse(Buffer.from(encryptedData, "base64").toString())
    const decrypted = this.decrypt(decoded.encrypted, key, decoded.iv, decoded.tag)

    return JSON.parse(decrypted)
  }
}

export const symmetricEncryption = new SymmetricEncryption()
