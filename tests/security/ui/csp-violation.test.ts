/**
 * تست‌های امنیتی برای بررسی عملکرد Content Security Policy
 *
 * این تست‌ها بررسی می‌کنند که آیا CSP به درستی پیکربندی شده است
 * و از اجرای اسکری��ت‌های غیرمجاز جلوگیری می‌کند.
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
    expect(csp).toContain("img-src")
    expect(csp).toContain("connect-src")
    expect(csp).toContain("font-src")
    expect(csp).toContain("object-src")
    expect(csp).toContain("media-src")
    expect(csp).toContain("frame-src")
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

    // صبر کردن برای اجرای CSP
    await page.waitForTimeout(1000)

    // بررسی وجود خطای CSP در کنسول
    const hasCspError = consoleErrors.some(
      (error) =>
        error.includes("Content Security Policy") ||
        error.includes("CSP") ||
        error.includes("Refused to execute") ||
        error.includes("unsafe-inline"),
    )

    expect(hasCspError).toBeTruthy()
  })

  test("should allow scripts with proper nonce", async ({ page }) => {
    // ناوبری به صفحه تست CSP
    await page.goto("/")

    // بررسی اینکه اسکریپت‌های با nonce صحیح اجرا شده‌اند
    const scriptElements = await page.locator("script[nonce]").count()
    expect(scriptElements).toBeGreaterThan(0)

    // بررسی عدم وجود خطای CSP برای اسکریپت‌های مجاز
    const consoleErrors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error" && msg.text().includes("CSP")) {
        consoleErrors.push(msg.text())
      }
    })

    await page.waitForTimeout(2000)

    // نباید خطای CSP برای اسکریپت‌های مجاز وجود داشته باشد
    const hasUnexpectedCspError = consoleErrors.some((error) => !error.includes("unsafe-inline"))
    expect(hasUnexpectedCspError).toBeFalsy()
  })

  test("should block external scripts from unauthorized domains", async ({ page }) => {
    const consoleErrors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto("/")

    // تلاش برای بارگذاری اسکریپت از دامنه غیرمجاز
    await page.evaluate(() => {
      const script = document.createElement("script")
      script.src = "https://malicious-site.example/script.js"
      document.body.appendChild(script)
    })

    await page.waitForTimeout(2000)

    // بررسی مسدود شدن اسکریپت خارجی
    const hasCspBlockError = consoleErrors.some(
      (error) => error.includes("Content Security Policy") && error.includes("malicious-site.example"),
    )

    expect(hasCspBlockError).toBeTruthy()
  })

  test("should allow trusted external resources", async ({ page }) => {
    await page.goto("/")

    // بررسی بارگذاری موفق منابع مجاز (مثل Google Fonts)
    const response = await page
      .waitForResponse((response) => response.url().includes("fonts.googleapis.com"), { timeout: 5000 })
      .catch(() => null)

    // اگر Google Fonts استفاده می‌شود، باید بارگذاری شود
    if (response) {
      expect(response.status()).toBeLessThan(400)
    }
  })

  test("should prevent clickjacking with frame-ancestors", async ({ request }) => {
    const response = await request.get("/")
    const csp = response.headers()["content-security-policy"]

    // بررسی وجود frame-ancestors برای جلوگیری از clickjacking
    expect(csp).toContain("frame-ancestors")
    expect(csp).toMatch(/frame-ancestors\s+[^;]*'self'/)
  })

  test("should have proper report-uri or report-to directive", async ({ request }) => {
    const response = await request.get("/")
    const csp = response.headers()["content-security-policy"]

    // بررسی وجود گزارش‌دهی نقض CSP
    const hasReporting = csp.includes("report-uri") || csp.includes("report-to")
    expect(hasReporting).toBeTruthy()
  })

  test("should block data: URIs in script-src", async ({ page }) => {
    const consoleErrors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto("/")

    // تلاش برای اجرای اسکریپت با data: URI
    await page.evaluate(() => {
      const script = document.createElement("script")
      script.src = "data:text/javascript,alert('XSS')"
      document.body.appendChild(script)
    })

    await page.waitForTimeout(1000)

    // بررسی مسدود شدن data: URI
    const hasCspError = consoleErrors.some(
      (error) =>
        error.includes("Content Security Policy") && (error.includes("data:") || error.includes("Refused to load")),
    )

    expect(hasCspError).toBeTruthy()
  })

  test("should have strict object-src policy", async ({ request }) => {
    const response = await request.get("/")
    const csp = response.headers()["content-security-policy"]

    // بررسی سیاست سخت‌گیرانه برای object-src
    expect(csp).toMatch(/object-src\s+[^;]*'none'/)
  })

  test("should validate nonce format and uniqueness", async ({ page }) => {
    await page.goto("/")

    // دریافت تمام nonce ها
    const nonces = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll("script[nonce]"))
      return scripts.map((script) => script.getAttribute("nonce"))
    })

    // بررسی فرمت nonce (باید base64 باشد)
    nonces.forEach((nonce) => {
      if (nonce) {
        expect(nonce).toMatch(/^[A-Za-z0-9+/]+=*$/)
        expect(nonce.length).toBeGreaterThanOrEqual(16)
      }
    })

    // بررسی یکتا بودن nonce ها
    const uniqueNonces = new Set(nonces.filter(Boolean))
    expect(uniqueNonces.size).toBe(nonces.filter(Boolean).length)
  })
})

test.describe("CSP Violation Reporting", () => {
  test("should send violation reports to correct endpoint", async ({ page }) => {
    let reportReceived = false
    let reportData: any = null

    // تنظیم route برای دریافت گزارش‌های CSP
    await page.route("/api/csp-violation-report", async (route) => {
      reportReceived = true
      reportData = await route.request().postDataJSON()
      await route.fulfill({
        status: 204,
        headers: { "Content-Type": "application/json" },
      })
    })

    await page.goto("/")

    // ایجاد نقض CSP
    await page.evaluate(() => {
      const script = document.createElement("script")
      script.textContent = "console.log('violation')"
      document.body.appendChild(script)
    })

    // صبر برای ارسال گزارش
    await page.waitForTimeout(3000)

    expect(reportReceived).toBeTruthy()
    if (reportData) {
      expect(reportData).toHaveProperty("csp-report")
      expect(reportData["csp-report"]).toHaveProperty("violated-directive")
      expect(reportData["csp-report"]).toHaveProperty("blocked-uri")
    }
  })

  test("should handle report-to header correctly", async ({ request }) => {
    const response = await request.get("/")
    const reportTo = response.headers()["report-to"]

    if (reportTo) {
      // بررسی فرمت JSON صحیح
      expect(() => JSON.parse(reportTo)).not.toThrow()

      const reportConfig = JSON.parse(reportTo)
      expect(reportConfig).toHaveProperty("group")
      expect(reportConfig).toHaveProperty("endpoints")
      expect(Array.isArray(reportConfig.endpoints)).toBeTruthy()
    }
  })
})

test.describe("CSP Edge Cases", () => {
  test("should handle hash-based script allowlisting", async ({ page }) => {
    await page.goto("/")

    // بررسی اسکریپت‌های inline با hash
    const inlineScripts = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("script:not([src]):not([nonce])"))
        .map((script) => script.textContent || "")
        .filter((content) => content.trim().length > 0)
    })

    // اگر اسکریپت inline وجود دارد، باید hash مناسب در CSP باشد
    if (inlineScripts.length > 0) {
      const response = await page.request.get("/")
      const csp = response.headers()["content-security-policy"]

      // بررسی وجود hash در script-src
      expect(csp).toMatch(/script-src[^;]*'sha\d+-[A-Za-z0-9+/=]+'/)
    }
  })

  test("should properly handle WebAssembly", async ({ request }) => {
    const response = await request.get("/")
    const csp = response.headers()["content-security-policy"]

    // اگر WebAssembly استفاده می‌شود، باید 'unsafe-eval' یا 'wasm-unsafe-eval' مجاز باشد
    if (csp.includes("wasm") || csp.includes("unsafe-eval")) {
      expect(csp).toMatch(/'wasm-unsafe-eval'|'unsafe-eval'/)
    }
  })

  test("should validate upgrade-insecure-requests", async ({ request }) => {
    const response = await request.get("/")
    const csp = response.headers()["content-security-policy"]

    // در محیط production باید upgrade-insecure-requests فعال باشد
    if (process.env.NODE_ENV === "production") {
      expect(csp).toContain("upgrade-insecure-requests")
    }
  })
})
