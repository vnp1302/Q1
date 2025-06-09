import DOMPurify from "isomorphic-dompurify"

export class InputSanitizer {
  static sanitizeHtml(input: string): string {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    })
  }

  static sanitizeSQL(input: string): string {
    // حذف کاراکترهای خطرناک SQL
    return input.replace(/[';\\x00\\n\\r\\x1a"]/g, "")
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) && email.length <= 254
  }

  static sanitizeFileName(filename: string): string {
    return filename.replace(/[^a-zA-Z0-9.-]/g, "_")
  }

  static validateApiKey(apiKey: string): boolean {
    // بررسی فرمت کلید API
    return /^[a-zA-Z0-9]{32,64}$/.test(apiKey)
  }
}
