import { createHash, randomBytes, createHmac, createCipheriv, createDecipheriv } from "crypto"

/**
 * Secure hash function with proper error handling
 */
export function secureHash(data: string, algorithm = "sha256"): string {
  if (!data) {
    throw new Error("Data is required for hashing")
  }

  try {
    return createHash(algorithm).update(data, "utf8").digest("hex")
  } catch (error) {
    throw new Error(`Hash generation failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

/**
 * Generate cryptographically secure random bytes
 */
export function generateSecureRandom(size = 32): Buffer {
  if (size <= 0) {
    throw new Error("Size must be a positive number")
  }

  try {
    return randomBytes(size)
  } catch (error) {
    throw new Error(`Random generation failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

/**
 * Generate secure random string (hex encoded)
 */
export function generateSecureRandomString(size = 32): string {
  return generateSecureRandom(size).toString("hex")
}

/**
 * Create secure HMAC
 */
export function createSecureHmac(key: string, data: string, algorithm = "sha256"): string {
  if (!key || !data) {
    throw new Error("Key and data are required for HMAC")
  }

  try {
    return createHmac(algorithm, key).update(data, "utf8").digest("hex")
  } catch (error) {
    throw new Error(`HMAC generation failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

/**
 * Secure encryption function
 */
export function secureEncrypt(text: string, key: string): { encrypted: string; iv: string } {
  if (!text || !key) {
    throw new Error("Text and key are required for encryption")
  }

  try {
    const iv = randomBytes(16)
    const cipher = createCipheriv("aes-256-cbc", Buffer.from(key.padEnd(32, "0").slice(0, 32)), iv)

    let encrypted = cipher.update(text, "utf8", "hex")
    encrypted += cipher.final("hex")

    return {
      encrypted,
      iv: iv.toString("hex"),
    }
  } catch (error) {
    throw new Error(`Encryption failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

/**
 * Secure decryption function
 */
export function secureDecrypt(encryptedData: { encrypted: string; iv: string }, key: string): string {
  if (!encryptedData.encrypted || !encryptedData.iv || !key) {
    throw new Error("Encrypted data, IV, and key are required for decryption")
  }

  try {
    const iv = Buffer.from(encryptedData.iv, "hex")
    const decipher = createDecipheriv("aes-256-cbc", Buffer.from(key.padEnd(32, "0").slice(0, 32)), iv)

    let decrypted = decipher.update(encryptedData.encrypted, "hex", "utf8")
    decrypted += decipher.final("utf8")

    return decrypted
  } catch (error) {
    throw new Error(`Decryption failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

/**
 * Compare two strings in constant time to prevent timing attacks
 */
export function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }

  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return result === 0
}
