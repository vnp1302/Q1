/**
 * سیستم لاگینگ امن
 *
 * این ماژول یک رابط لاگینگ امن ارائه می‌دهد که از افشای اطلاعات حساس جلوگیری می‌کند.
 */

type LogLevel = "debug" | "info" | "warn" | "error"

interface LogOptions {
  // فیلدهای اضافی برای لاگ
  [key: string]: any
}

// لیست الگوهای حساس که باید سانسور شوند
const SENSITIVE_PATTERNS = [
  /password/i,
  /token/i,
  /secret/i,
  /key/i,
  /auth/i,
  /credential/i,
  /ssn/i,
  /social.*security/i,
  /credit.*card/i,
  /card.*number/i,
  /authorization/i,
]

/**
 * بررسی می‌کند که آیا یک کلید حاوی اطلاعات حساس است
 */
function isSensitiveKey(key: string): boolean {
  return SENSITIVE_PATTERNS.some((pattern) => pattern.test(key))
}

/**
 * سانسور اطلاعات حساس در یک شیء
 */
function sanitizeObject(obj: any): any {
  if (!obj || typeof obj !== "object") {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item))
  }

  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      if (isSensitiveKey(key)) {
        acc[key] = typeof value === "string" ? "***REDACTED***" : "[REDACTED]"
      } else if (typeof value === "object" && value !== null) {
        acc[key] = sanitizeObject(value)
      } else {
        acc[key] = value
      }
      return acc
    },
    {} as Record<string, any>,
  )
}

/**
 * فرمت کردن پیام لاگ
 */
function formatLogMessage(level: LogLevel, message: string, options?: LogOptions): string {
  const timestamp = new Date().toISOString()
  const sanitizedOptions = options ? sanitizeObject(options) : {}

  return JSON.stringify({
    timestamp,
    level,
    message,
    ...sanitizedOptions,
  })
}

/**
 * لاگر اصلی
 */
export const logger = {
  debug(message: string, options?: LogOptions): void {
    if (process.env.NODE_ENV !== "production") {
      console.debug(formatLogMessage("debug", message, options))
    }
  },

  info(message: string, options?: LogOptions): void {
    console.info(formatLogMessage("info", message, options))
  },

  warn(message: string, options?: LogOptions): void {
    console.warn(formatLogMessage("warn", message, options))
  },

  error(message: string, error?: Error, options?: LogOptions): void {
    const errorDetails = error
      ? {
          name: error.name,
          message: error.message,
          stack: process.env.NODE_ENV !== "production" ? error.stack : undefined,
          ...options,
        }
      : options

    console.error(formatLogMessage("error", message, errorDetails))
  },
}

export default logger
