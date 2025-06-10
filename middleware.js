import { NextResponse } from "next/server"
import { RateLimiterMemory } from "rate-limiter-flexible"
import { createHash } from "crypto"

// Rate Limiter Configuration
const rateLimiter = new RateLimiterMemory({
  keyPrefix: "middleware",
  points: 100, // Number of requests
  duration: 60, // Per 60 seconds
})

// Security Headers
const securityHeaders = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "0",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Cross-Origin-Embedder-Policy": "require-corp",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Permissions-Policy": "geolocation=(), camera=(), microphone=(), payment=(), usb=(), bluetooth=()",
}

// Generate CSP Nonce
function generateNonce() {
  return createHash("sha256").update(Math.random().toString()).digest("base64").substring(0, 16)
}

// IP Whitelist for Admin Routes
const adminWhitelist = process.env.ADMIN_IP_WHITELIST?.split(",") || []

// Blocked User Agents
const blockedUserAgents = ["bot", "crawler", "spider", "scraper"]

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl
  const response = NextResponse.next()

  // Get client information
  const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
  const userAgent = request.headers.get("user-agent") || ""
  const referer = request.headers.get("referer") || ""

  try {
    // Rate Limiting
    if (!pathname.startsWith("/_next") && !pathname.startsWith("/api/health")) {
      try {
        await rateLimiter.consume(ip)
      } catch (rejRes) {
        console.warn(`Rate limit exceeded for IP: ${ip}`)
        return new NextResponse("Too Many Requests", {
          status: 429,
          headers: {
            "Retry-After": Math.round(rejRes.msBeforeNext / 1000) || 60,
            ...securityHeaders,
          },
        })
      }
    }

    // Block suspicious user agents
    const isSuspiciousUA = blockedUserAgents.some((blocked) => userAgent.toLowerCase().includes(blocked))

    if (isSuspiciousUA && !pathname.startsWith("/api/health")) {
      console.warn(`Blocked suspicious user agent: ${userAgent} from IP: ${ip}`)
      return new NextResponse("Forbidden", {
        status: 403,
        headers: securityHeaders,
      })
    }

    // Admin Route Protection
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
      if (adminWhitelist.length > 0 && !adminWhitelist.includes(ip)) {
        console.warn(`Unauthorized admin access attempt from IP: ${ip}`)
        return new NextResponse("Forbidden", {
          status: 403,
          headers: securityHeaders,
        })
      }
    }

    // API Route Security
    if (pathname.startsWith("/api/")) {
      // Validate API requests
      if (request.method === "POST" || request.method === "PUT" || request.method === "DELETE") {
        const contentType = request.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          return new NextResponse("Invalid Content-Type", {
            status: 400,
            headers: securityHeaders,
          })
        }
      }

      // Add API-specific headers
      response.headers.set("X-API-Version", "1.0")
      response.headers.set(
        "X-Request-ID",
        createHash("sha256").update(`${Date.now()}-${ip}`).digest("hex").substring(0, 16),
      )
    }

    // Generate and set CSP nonce
    const nonce = generateNonce()
    response.headers.set("X-Nonce", nonce)

    // Set security headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    // Enhanced CSP with nonce
    const csp =
      process.env.NODE_ENV === "production"
        ? `default-src 'none'; script-src 'self' 'nonce-${nonce}' 'strict-dynamic'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' wss: https:; font-src 'self'; object-src 'none'; media-src 'self'; frame-src 'none'; worker-src 'self'; manifest-src 'self'; base-uri 'self'; form-action 'self'; report-uri /api/security/csp-report`
        : `default-src 'self' 'unsafe-eval' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' ws: wss:;`

    response.headers.set("Content-Security-Policy", csp)

    // HSTS Header
    if (process.env.NODE_ENV === "production") {
      response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
    }

    // Log security events
    if (pathname.startsWith("/api/") || pathname.startsWith("/dashboard")) {
      console.log(`Security Log: ${request.method} ${pathname} - IP: ${ip} - UA: ${userAgent.substring(0, 100)}`)
    }

    return response
  } catch (error) {
    console.error("Middleware error:", error)
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: securityHeaders,
    })
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}
