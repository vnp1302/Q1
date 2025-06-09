/**
 * سیستم محدودکننده نرخ درخواست (Rate Limiter)
 *
 * این ماژول برای محدود کردن تعداد درخواست‌های API استفاده می‌شود
 * تا از حملات brute force و DDoS جلوگیری شود.
 *
 * @see https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks
 */

import { RateLimiterMemory } from "rate-limiter-flexible"
import type { NextApiRequest, NextApiResponse } from "next"
import { logger } from "./logger"

// تنظیمات پیش‌فرض برای rate limiter
const DEFAULT_POINTS = 10 // تعداد درخواست‌های مجاز
const DEFAULT_DURATION = 60 // دوره زمانی به ثانیه

// ایجاد rate limiter برای API های عمومی
const publicApiLimiter = new RateLimiterMemory({
  points: DEFAULT_POINTS,
  duration: DEFAULT_DURATION,
})

// rate limiter سختگیرانه‌تر برای مسیرهای حساس مانند ورود و ثبت‌نام
const authLimiter = new RateLimiterMemory({
  points: 5, // تعداد درخواست‌های کمتر
  duration: 60,
  blockDuration: 300, // مسدود کردن به مدت 5 دقیقه پس از رسیدن به محدودیت
})

/**
 * دریافت کلید منحصر به فرد برای هر کاربر
 * ترکیبی از IP و User-Agent استفاده می‌شود تا دقت بیشتری داشته باشد
 */
function getClientKey(req: NextApiRequest): string {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown"

  const userAgent = req.headers["user-agent"] || "unknown"

  // ایجاد یک کلید منحصر به فرد با ترکیب IP و بخشی از User-Agent
  return `${ip}:${userAgent.substring(0, 20)}`
}

/**
 * میدلور rate limiting برای API ها
 */
export async function rateLimiterMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  options: {
    limiter?: RateLimiterMemory
    points?: number
    message?: string
  } = {},
) {
  const clientKey = getClientKey(req)
  const limiter = options.limiter || publicApiLimiter
  const points = options.points || 1
  const message = options.message || "Too many requests, please try again later."

  try {
    // اعمال rate limiting
    const rateLimiterRes = await limiter.consume(clientKey, points)

    // اضافه کردن هدرهای Rate Limit به پاسخ
    res.setHeader("X-RateLimit-Limit", limiter.points)
    res.setHeader("X-RateLimit-Remaining", rateLimiterRes.remainingPoints)
    res.setHeader("X-RateLimit-Reset", new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString())

    return true
  } catch (error) {
    // اگر کاربر به محدودیت رسیده باشد
    if (error instanceof Error) {
      logger.warn("Rate limit exceeded", {
        clientKey,
        path: req.url,
        method: req.method,
      })

      // تنظیم هدرهای مناسب
      res.setHeader("Retry-After", Math.floor(error.msBeforeNext / 1000))
      res.status(429).json({ error: message })
    } else {
      // خطای غیرمنتظره
      logger.error("Rate limiter error", error)
      res.status(500).json({ error: "Internal server error" })
    }

    return false
  }
}

// صادر کردن limiter های مختلف برای استفاده در API های مختلف
export const rateLimiters = {
  public: publicApiLimiter,
  auth: authLimiter,
  // می‌توان limiter های دیگری برای API های خاص تعریف کرد
}

export default rateLimiterMiddleware
