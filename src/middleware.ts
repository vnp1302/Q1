/**
 * Next.js Middleware برای اعمال هدرهای امنیتی و سیاست‌های CSP
 *
 * این میدلور هدرهای امنیتی را به تمام پاسخ‌ها اضافه می‌کند و
 * همچنین CSP را با یک nonce منحصر به فرد برای هر درخواست پیکربندی می‌کند.
 *
 * @see https://nextjs.org/docs/advanced-features/middleware
 * @see https://owasp.org/www-project-secure-headers/
 */

import { NextResponse, type NextRequest } from "next/server"
import { CspManager } from "./core/content-security/CspManager"

export function middleware(request: NextRequest) {
  // ایجاد یک نمونه از مدیر CSP با تنظیمات پیش‌فرض
  const cspManager = new CspManager({
    "default-src": ["'self'"],
    "script-src": ["'self'", "'strict-dynamic'"],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:"],
    "connect-src": ["'self'", "https://api.example.com"],
    "frame-src": ["'none'"],
    "report-uri": ["/csp-violation-report"],
  })

  // دریافت nonce برای استفاده در CSP
  const nonce = cspManager.getNonce()

  // اضافه کردن nonce به script-src
  cspManager.addDirectiveSource("script-src", `'nonce-${nonce}'`)

  // ایجاد پاسخ با هدرهای امنیتی
  const response = NextResponse.next()

  // تنظیم هدرهای امنیتی
  response.headers.set("Content-Security-Policy", cspManager.toString())
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "geolocation=(), camera=(), microphone=()")
  response.headers.set("X-XSS-Protection", "1; mode=block")

  // تنظیم هدر Strict-Transport-Security برای HTTPS
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")

  // ذخیره nonce در هدر برای استفاده در سمت سرور
  response.headers.set("X-CSP-Nonce", nonce)

  return response
}

// پیکربندی مسیرهایی که میدلور باید روی آنها اعمال شود
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
}
