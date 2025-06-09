import { RateLimiter } from "../../../../src/core/firewall/RateLimiter"

describe("Brute Force Protection", () => {
  beforeEach(() => {
    // پاک کردن store برای هر تست
    ;(RateLimiter as any).store.clear()
  })

  test("should block after max attempts", () => {
    const identifier = "test-user"

    // تلاش‌های مجاز
    for (let i = 0; i < 100; i++) {
      expect(RateLimiter.isAllowed(identifier)).toBe(true)
    }

    // تلاش اضافی باید مسدود شود
    expect(RateLimiter.isAllowed(identifier)).toBe(false)
  })

  test("should reset after time window", async () => {
    const identifier = "test-user-2"

    // پر کردن محدودیت
    for (let i = 0; i < 100; i++) {
      RateLimiter.isAllowed(identifier)
    }

    expect(RateLimiter.isAllowed(identifier)).toBe(false)

    // شبیه‌سازی گذشت زمان
    jest.advanceTimersByTime(15 * 60 * 1000 + 1000)

    expect(RateLimiter.isAllowed(identifier)).toBe(true)
  })
})
