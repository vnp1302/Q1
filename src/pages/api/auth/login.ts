/**
 * API Route برای ورود کاربران
 *
 * این API با امنیت بالا پیاده‌سازی شده است و از تکنیک‌های مختلف
 * برای جلوگیری از حملات مانند brute force استفاده می‌کند.
 *
 * @see https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
 */

import type { NextApiRequest, NextApiResponse } from "next"
import { rateLimiterMiddleware, rateLimiters } from "@/lib/rate-limiter"
import { logger } from "@/lib/logger"

// تعداد درخواست‌های مجاز برای ورود
const MAX_LOGIN_ATTEMPTS = 5

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // فقط متد POST مجاز است
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  // اعمال rate limiting برای جلوگیری از حملات brute force
  const rateLimited = await rateLimiterMiddleware(req, res, {
    limiter: rateLimiters.auth,
    points: 1,
    message: "Too many login attempts. Please try again later.",
  })

  if (!rateLimited) {
    return // پاسخ قبلاً توسط میدلور rate limiter ارسال شده است
  }

  try {
    const { email, password } = req.body

    // بررسی وجود فیلدهای ضروری
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    // اعتبارسنجی ورودی‌ها
    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ error: "Invalid input format" })
    }

    // اعتبارسنجی فرمت ایمیل
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" })
    }

    // در اینجا باید منطق احراز هویت واقعی پیاده‌سازی شود
    // به عنوان مثال، بررسی اعتبار کاربر در دیتابیس

    // مثال ساده برای نمایش:
    const user = await authenticateUser(email, password)

    if (!user) {
      // ثبت تلاش ناموفق ورود
      logger.warn("Failed login attempt", { email })

      // تأخیر تصادفی برای جلوگیری از timing attacks
      await randomDelay(200, 500)

      return res.status(401).json({ error: "Invalid email or password" })
    }

    // ایجاد توکن احراز هویت
    const token = generateAuthToken(user.id)

    // تنظیم کوکی امن
    res.setHeader("Set-Cookie", [`auth-token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600;`])

    // ثبت ورود موفق
    logger.info("Successful login", { userId: user.id })

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    logger.error("Login error", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

/**
 * تأخیر تصادفی برای جلوگیری از timing attacks
 */
async function randomDelay(min: number, max: number): Promise<void> {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min
  return new Promise((resolve) => setTimeout(resolve, delay))
}

/**
 * احراز هویت کاربر (نمونه)
 * در یک پیاده‌سازی واقعی، این تابع باید با دیتابیس ارتباط برقرار کند
 */
async function authenticateUser(email: string, password: string) {
  // این فقط یک نمونه است و باید با پیاده‌سازی واقعی جایگزین شود
  if (email === "admin@example.com" && password === "securePassword123") {
    return {
      id: "1",
      email: "admin@example.com",
      name: "Admin User",
    }
  }
  return null
}

/**
 * تولید توکن احراز هویت
 */
function generateAuthToken(userId: string): string {
  // در یک پیاده‌سازی واقعی، باید از یک کتابخانه مناسب مانند JWT استفاده شود
  const payload = {
    userId,
    exp: Math.floor(Date.now() / 1000) + 3600, // منقضی شدن پس از 1 ساعت
  }

  // این فقط یک نمونه ساده است
  return Buffer.from(JSON.stringify(payload)).toString("base64")
}
