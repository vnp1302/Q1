/**
 * تست‌های امنیتی برای بررسی عملکرد Content Security Policy
 *
 * این تست‌ها بررسی می‌کنند که آیا CSP به درستی پیکربندی شده است
 * و از اجرای اسکریپت‌های غیرمجاز جلوگیری می‌کند.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
 */

import { test, expect } from "@playwright/test"

test.describe("Content Security Policy Tests", () => {
  test("should have CSP header set", async ({ request }) => {
    // درخواست به صفحه اصلی
    const response = await request.get("/")

    // بررسی وجود هدر Content-Security-Policy
    const csp = response.headers()["content-security-policy"]
    expect(csp).toBeDefined()

    // بررسی دستورات اصلی CSP
    expect(csp).toContain("default-src")
    expect(csp).toContain("script-src")
    expect(csp).toContain("style-src")
  })

  test("should block inline scripts without nonce", async ({ page }) => {
    // تنظیم یک listener برای خطاهای کنسول
    const consoleErrors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text())
      }
    })

    // تلاش برای اجرای یک اسکریپت inline بدون nonce
    await page.goto("/")
    await page.evaluate(() => {
      const script = document.createElement("script")
      script.textContent = 'console.log("This should be blocked by CSP")'
      document.body.appendChild(script)
    })

    // بررسی وجود خطای CSP در کنسول
    const hasCspError = consoleErrors.some(
      (error) =>
        error.includes("Content Security Policy") || error.includes("CSP") || error.includes("Refused to execute"),
    )

    expect(hasCspError).toBeTruthy()
  })

  test("should allow scripts with proper nonce", async ({ page }) => {
    // ناوبری به صفحه تست CSP
    await page.goto("/security-test/csp")

    // بررسی اینکه اسکریپت با nonce صحیح اجرا شده است
    const testElement = await page.locator("#csp-test-result")
    await expect(testElement).toHaveText("Script with nonce executed successfully")
  })

  test("should send violation reports to reporting endpoint", async ({ page, request }) => {
    // ایجاد یک mock برای endpoint گزارش CSP
    let reportReceived = false

    // تنظیم یک route برای دریافت گزارش‌های CSP
    await page.route("/csp-violation-report", async (route) => {
      reportReceived = true
      await route.fulfill({ status: 204 })
    })

    // تلاش برای اجرای یک اسکریپت که CSP را نقض می‌کند
    await page.goto("/")
    await page.evaluate(() => {
      const script = document.createElement("script")
      script.src = "https://malicious-site.example/script.js"
      document.body.appendChild(script)
    })

    // بررسی اینکه آیا گزارش نقض CSP ارسال شده است
    expect(reportReceived).toBeTruthy()
  })
})
