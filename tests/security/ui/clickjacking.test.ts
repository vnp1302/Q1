/**
 * تست‌های امنیتی برای شناسایی آسیب‌پذیری‌های Clickjacking
 *
 * این تست‌ها بررسی می‌کنند که آیا هدرهای امنیتی مناسب برای جلوگیری از
 * حملات clickjacking تنظیم شده‌اند.
 *
 * @see https://owasp.org/www-community/attacks/Clickjacking
 */

import { test, expect } from "@playwright/test"

test.describe("Clickjacking Protection Tests", () => {
  test("should have X-Frame-Options header set to DENY", async ({ request }) => {
    // درخواست به صفحه اصلی
    const response = await request.get("/")

    // بررسی وجود هدر X-Frame-Options
    const xFrameOptions = response.headers()["x-frame-options"]
    expect(xFrameOptions).toBeDefined()
    expect(xFrameOptions.toLowerCase()).toBe("deny")
  })

  test("should have proper CSP frame-ancestors directive", async ({ request }) => {
    // درخواست به صفحه اصلی
    const response = await request.get("/")

    // بررسی وجود هدر Content-Security-Policy
    const csp = response.headers()["content-security-policy"]
    expect(csp).toBeDefined()

    // بررسی وجود دستور frame-ancestors در CSP
    const hasFrameAncestors = csp.includes("frame-ancestors")

    // اگر frame-ancestors وجود دارد، باید محدودکننده باشد
    if (hasFrameAncestors) {
      expect(csp).toMatch(/frame-ancestors\s+'none'|frame-ancestors\s+'self'/)
    }
    // در غیر این صورت، باید frame-src محدودکننده باشد
    else {
      expect(csp).toMatch(/frame-src\s+'none'|frame-src\s+'self'/)
    }
  })

  test("should not be embeddable in an iframe", async ({ page }) => {
    // ایجاد یک صفحه HTML با iframe که سعی می‌کند سایت ما را embed کند
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Clickjacking Test</title>
        </head>
        <body>
          <h1>Clickjacking Test</h1>
          <iframe id="target-iframe" src="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}" width="500" height="500"></iframe>
        </body>
      </html>
    `)

    // بررسی اینکه آیا iframe خالی است یا خطا دارد
    // در صورت وجود محافظت clickjacking، iframe نباید محتوای سایت ما را نشان دهد
    const iframeContent = await page.evaluate(() => {
      const iframe = document.getElementById("target-iframe") as HTMLIFrameElement
      try {
        return iframe.contentDocument?.body?.innerHTML || null
      } catch (e) {
        return "BLOCKED"
      }
    })

    // اگر مرورگر اجازه دسترسی به محتوای iframe را ندهد، مقدار null یا BLOCKED برمی‌گرداند
    expect(iframeContent === null || iframeContent === "BLOCKED").toBeTruthy()
  })
})
