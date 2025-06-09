/**
 * API Route برای دریافت گزارش‌های نقض CSP
 *
 * این API گزارش‌های نقض CSP را دریافت و ثبت می‌کند.
 * می‌توان آن را برای ارسال گزارش‌ها به یک سرویس مانیتورینگ گسترش داد.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP#reporting
 */

import type { NextApiRequest, NextApiResponse } from "next"
import { logger } from "@/lib/logger"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    // دریافت گزارش CSP
    const report = req.body["csp-report"] || req.body

    // ثبت گزارش نقض CSP
    logger.warn("CSP Violation:", {
      report,
      url: req.headers.referer || "Unknown",
      userAgent: req.headers["user-agent"] || "Unknown",
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown",
    })

    // در اینجا می‌توانید گزارش را به یک سرویس مانیتورینگ مانند Sentry ارسال کنید
    // await sentryClient.captureException(new Error('CSP Violation'), {
    //   extra: { report }
    // });

    return res.status(204).end()
  } catch (error) {
    logger.error("Error processing CSP violation report:", error)
    return res.status(500).json({ message: "Error processing CSP report" })
  }
}
