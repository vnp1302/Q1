import { type NextRequest, NextResponse } from "next/server"
import { rateLimiterMiddleware, rateLimiters } from "@/lib/rate-limiter"
import { logger } from "@/lib/logger"

export async function POST(req: NextRequest) {
  try {
    // اعمال rate limiting
    const rateLimited = await rateLimiterMiddleware(req, NextResponse, {
      limiter: rateLimiters.auth,
      points: 1,
      message: "Too many registration attempts. Please try again later.",
    })

    if (!rateLimited) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
    }

    const body = await req.json()
    const { firstName, lastName, email, phone, password, agreeToTerms } = body

    // اعتبارسنجی ورودی‌ها
    if (!firstName || !lastName || !email || !phone || !password || !agreeToTerms) {
      return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 })
    }

    // اعتبارسنجی فرمت ایمیل
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // اعتبارسنجی شماره تلفن
    const phoneRegex = /^09\d{9}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 })
    }

    // اعتبارسنجی رمز عبور
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one lowercase letter, one uppercase letter, and one number" },
        { status: 400 },
      )
    }

    // در اینجا باید منطق ثبت‌نام واقعی پیاده‌سازی شود
    // بررسی عدم وجود کاربر با همین ایمیل
    // هش کردن رمز عبور
    // ذخیره در دیتابیس
    // ارسال ایمیل تأیید

    // شبیه‌سازی ثبت‌نام موفق
    await new Promise((resolve) => setTimeout(resolve, 1000))

    logger.info("User registration successful", { email })

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful. Please check your email for verification.",
        user: {
          id: "user_" + Math.random().toString(36).substring(2, 15),
          email,
          firstName,
          lastName,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    logger.error("Registration error", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
