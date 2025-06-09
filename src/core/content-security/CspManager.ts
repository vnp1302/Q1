/**
 * Content Security Policy Manager
 *
 * این کلاس مدیریت سیاست‌های امنیتی محتوا (CSP) را با پشتیبانی از nonce انجام می‌دهد.
 * CSP یک لایه امنیتی اضافی است که به شناسایی و کاهش انواع حملات مانند XSS کمک می‌کند.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
 * @see https://owasp.org/www-project-secure-headers/
 */

import crypto from "crypto"

export interface CspDirectives {
  "default-src"?: string[]
  "script-src"?: string[]
  "style-src"?: string[]
  "img-src"?: string[]
  "connect-src"?: string[]
  "font-src"?: string[]
  "object-src"?: string[]
  "media-src"?: string[]
  "frame-src"?: string[]
  "report-uri"?: string[]
  "worker-src"?: string[]
  "manifest-src"?: string[]
  [key: string]: string[] | undefined
}

export class CspManager {
  private nonce: string
  private directives: CspDirectives

  constructor(directives: CspDirectives = {}) {
    // تولید یک nonce تصادفی برای هر درخواست
    this.nonce = this.generateNonce()

    // تنظیم دستورات CSP پیش‌فرض
    this.directives = {
      "default-src": ["'self'"],
      "script-src": ["'self'", `'nonce-${this.nonce}'`, "'strict-dynamic'"],
      "style-src": ["'self'", "'unsafe-inline'"],
      "img-src": ["'self'", "data:"],
      "connect-src": ["'self'"],
      "font-src": ["'self'"],
      "object-src": ["'none'"],
      "media-src": ["'self'"],
      "frame-src": ["'none'"],
      "report-uri": ["/csp-violation-report"],
      ...directives,
    }
  }

  /**
   * تولید یک nonce تصادفی برای استفاده در CSP
   */
  private generateNonce(): string {
    return crypto.randomBytes(16).toString("base64")
  }

  /**
   * دریافت nonce فعلی
   */
  public getNonce(): string {
    return this.nonce
  }

  /**
   * اضافه کردن یک منبع به یک دستور CSP خاص
   */
  public addDirectiveSource(directive: string, source: string): void {
    if (!this.directives[directive]) {
      this.directives[directive] = []
    }

    if (!this.directives[directive]?.includes(source)) {
      this.directives[directive]?.push(source)
    }
  }

  /**
   * تنظیم کامل یک دستور CSP
   */
  public setDirective(directive: string, sources: string[]): void {
    this.directives[directive] = sources
  }

  /**
   * تبدیل دستورات CSP به رشته برای استفاده در هدر HTTP
   */
  public toString(): string {
    return Object.entries(this.directives)
      .map(([directive, sources]) => {
        if (!sources || sources.length === 0) return ""
        return `${directive} ${sources.join(" ")}`
      })
      .filter(Boolean)
      .join("; ")
  }

  /**
   * ایجاد یک نمونه جدید از CspManager با همان دستورات اما nonce جدید
   */
  public regenerate(): CspManager {
    return new CspManager(this.directives)
  }

  /**
   * ایجاد تگ meta برای CSP که می‌تواند در head صفحه قرار گیرد
   */
  public createMetaTag(): string {
    return `<meta http-equiv="Content-Security-Policy" content="${this.toString()}">`
  }
}

export default CspManager
