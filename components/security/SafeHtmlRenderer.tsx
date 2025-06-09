"use client"

/**
 * SafeHtmlRenderer Component
 *
 * این کامپوننت برای رندر ایمن HTML با استفاده از DOMPurify استفاده می‌شود.
 * از این کامپوننت به جای استفاده مستقیم از dangerouslySetInnerHTML استفاده کنید.
 *
 * @see https://github.com/cure53/DOMPurify
 * @see https://owasp.org/www-community/attacks/xss/
 */

import type React from "react"
import { useMemo } from "react"
import DOMPurify from "dompurify"

interface SafeHtmlRendererProps {
  /**
   * محتوای HTML که باید به صورت ایمن رندر شود
   */
  html: string

  /**
   * تگ‌های HTML مجاز (اختیاری)
   */
  allowedTags?: string[]

  /**
   * ویژگی‌های HTML مجاز (اختیاری)
   */
  allowedAttributes?: { [key: string]: string[] }

  /**
   * کلاس CSS برای عنصر container
   */
  className?: string
}

export const SafeHtmlRenderer: React.FC<SafeHtmlRendererProps> = ({
  html,
  allowedTags,
  allowedAttributes,
  className,
}) => {
  // پیکربندی DOMPurify با تنظیمات ارائه شده
  const sanitizedHtml = useMemo(() => {
    const sanitizeConfig: DOMPurify.Config = {}

    if (allowedTags) {
      sanitizeConfig.ALLOWED_TAGS = allowedTags
    }

    if (allowedAttributes) {
      sanitizeConfig.ALLOWED_ATTR = Object.entries(allowedAttributes).flatMap(([_, attrs]) => attrs)
    }

    // اعمال sanitize به HTML ورودی
    return DOMPurify.sanitize(html, sanitizeConfig)
  }, [html, allowedTags, allowedAttributes])

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} data-testid="safe-html-container" />
  )
}

export default SafeHtmlRenderer
