import { createHash, randomBytes, createHmac } from "crypto"

/**
 * Secure hash function with proper error handling
 */
export function secureHash(data: string, algorithm = "sha256"): string {
  try {
    return createHash(algorithm).update(data, "utf8").digest("hex")
  } catch (error) {
    throw new Error(`Hash generation failed: ${error}`)
  }
}

/**
 * Generate cryptographically secure random bytes
 */
export function generateSecureRandom(size = 32): Buffer {
  try {
    return randomBytes(size)
  } catch (error) {
    throw new Error(`Random generation failed: ${error}`)
  }
}

/**
 * Create secure HMAC
 */
export function createSecureHmac(key: string, data: string, algorithm = "sha256"): string {
  try {
    return createHmac(algorithm, key).update(data, "utf8").digest("hex")
  } catch (error) {
    throw new Error(`HMAC generation failed: ${error}`)
  }
}
