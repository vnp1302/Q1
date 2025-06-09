import { securityConfig } from "../../security-config"

interface RateLimitEntry {
  count: number
  resetTime: number
  blocked: boolean
}

export class RateLimiter {
  private readonly store = new Map<string, RateLimitEntry>()
  private readonly windowMs = securityConfig.rateLimit.windowMs
  private readonly maxRequests = securityConfig.rateLimit.maxRequests

  /**
   * Check if request should be rate limited
   */
  isRateLimited(identifier: string): { limited: boolean; remaining: number; resetTime: number } {
    const now = Date.now()
    const entry = this.store.get(identifier)

    if (!entry || now > entry.resetTime) {
      // Create new entry or reset expired entry
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
        blocked: false,
      })

      return {
        limited: false,
        remaining: this.maxRequests - 1,
        resetTime: now + this.windowMs,
      }
    }

    if (entry.blocked) {
      return {
        limited: true,
        remaining: 0,
        resetTime: entry.resetTime,
      }
    }

    entry.count++

    if (entry.count > this.maxRequests) {
      entry.blocked = true
      return {
        limited: true,
        remaining: 0,
        resetTime: entry.resetTime,
      }
    }

    return {
      limited: false,
      remaining: this.maxRequests - entry.count,
      resetTime: entry.resetTime,
    }
  }

  /**
   * Rate limit for trading operations (stricter)
   */
  isTradingRateLimited(userId: string): { limited: boolean; remaining: number } {
    const identifier = `trading:${userId}`
    const maxTradingRequests = 10 // Much stricter for trading
    const tradingWindowMs = 60 * 1000 // 1 minute window

    const now = Date.now()
    const entry = this.store.get(identifier)

    if (!entry || now > entry.resetTime) {
      this.store.set(identifier, {
        count: 1,
        resetTime: now + tradingWindowMs,
        blocked: false,
      })

      return {
        limited: false,
        remaining: maxTradingRequests - 1,
      }
    }

    entry.count++

    if (entry.count > maxTradingRequests) {
      entry.blocked = true
      return {
        limited: true,
        remaining: 0,
      }
    }

    return {
      limited: false,
      remaining: maxTradingRequests - entry.count,
    }
  }

  /**
   * Block IP address temporarily
   */
  blockIp(ipAddress: string, durationMs = 3600000): void {
    this.store.set(`blocked:${ipAddress}`, {
      count: 0,
      resetTime: Date.now() + durationMs,
      blocked: true,
    })
  }

  /**
   * Check if IP is blocked
   */
  isIpBlocked(ipAddress: string): boolean {
    const entry = this.store.get(`blocked:${ipAddress}`)
    if (!entry) return false

    if (Date.now() > entry.resetTime) {
      this.store.delete(`blocked:${ipAddress}`)
      return false
    }

    return entry.blocked
  }

  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key)
      }
    }
  }

  /**
   * Get current stats for monitoring
   */
  getStats(): { totalEntries: number; blockedIps: number; activeRateLimits: number } {
    let blockedIps = 0
    let activeRateLimits = 0

    for (const [key, entry] of this.store.entries()) {
      if (key.startsWith("blocked:")) {
        blockedIps++
      } else if (entry.count > 0) {
        activeRateLimits++
      }
    }

    return {
      totalEntries: this.store.size,
      blockedIps,
      activeRateLimits,
    }
  }
}

export const rateLimiter = new RateLimiter()

// Clean up expired entries every 5 minutes
setInterval(
  () => {
    rateLimiter.cleanup()
  },
  5 * 60 * 1000,
)
