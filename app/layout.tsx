import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Q2 Token Platform",
  description: "A secure token platform with advanced security features",
  // تنظیم هدرهای امنیتی اضافی در متادیتا
  other: {
    referrer: "strict-origin-when-cross-origin",
    "x-frame-options": "DENY",
    "x-content-type-options": "nosniff",
    "permissions-policy": "geolocation=(), camera=(), microphone=()",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
