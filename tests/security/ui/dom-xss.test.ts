/**
 * تست‌های امنیتی برای شناسایی آسیب‌پذیری‌های XSS
 *
 * این تست‌ها بررسی می‌کنند که آیا کامپوننت SafeHtmlRenderer به درستی
 * محتوای HTML را sanitize می‌کند و از حملات XSS جلوگیری می‌کند.
 *
 * @see https://owasp.org/www-community/attacks/xss/
 */

import { test, expect } from "@playwright/test"

// مجموعه‌ای از payload های XSS برای تست
const XSS_PAYLOADS = [
  '<script>alert("XSS")</script>',
  '<img src="x" onerror="alert(\'XSS\')">',
  "<a href=\"javascript:alert('XSS')\">Click me</a>",
  "<div onmouseover=\"alert('XSS')\">Hover over me</div>",
  '"><script>alert("XSS")</script>',
  '<svg/onload=alert("XSS")>',
  '<body onload=alert("XSS")>',
  "<iframe src=\"javascript:alert('XSS')\"></iframe>",
]

test.describe("DOM XSS Security Tests", () => {
  test.beforeEach(async ({ page }) => {
    // ناوبری به صفحه تست XSS
    await page.goto("/security-test/xss")
  })

  test("SafeHtmlRenderer should sanitize XSS payloads", async ({ page }) => {
    // برای هر payload XSS
    for (const payload of XSS_PAYLOADS) {
      // وارد کردن payload در فیلد ورودی
      await page.fill("#html-input", payload)
      await page.click("#render-button")

      // بررسی اینکه آیا کد اسکریپت اجرا شده است
      const dialogPromise = page.waitForEvent("dialog", { timeout: 1000 }).catch((e) => null)

      // اگر دیالوگی (مانند alert) نمایش داده شود، تست شکست خورده است
      const dialog = await dialogPromise
      expect(dialog).toBeNull()

      // بررسی اینکه محتوای خطرناک حذف شده است
      const renderedHtml = await page.textContent("#safe-html-container")
      expect(renderedHtml).not.toContain("script")
      expect(renderedHtml).not.toContain("onerror")
      expect(renderedHtml).not.toContain("javascript:")
    }
  })

  test("SafeHtmlRenderer should respect allowedTags configuration", async ({ page }) => {
    // تست با تگ‌های مجاز محدود
    await page.fill("#html-input", '<p>Safe paragraph</p><script>alert("XSS")</script><div>Div content</div>')

    // انتخاب گزینه "فقط تگ p مجاز است"
    await page.selectOption("#allowed-tags", "p-only")
    await page.click("#render-button")

    // بررسی اینکه فقط تگ p حفظ شده است
    const renderedHtml = await page.innerHTML("#safe-html-container")
    expect(renderedHtml).toContain("<p>Safe paragraph</p>")
    expect(renderedHtml).not.toContain("<script>")
    expect(renderedHtml).not.toContain("<div>")
  })
})
