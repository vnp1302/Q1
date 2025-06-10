import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { CSPostHogProvider } from "@/components/providers/posthog-provider"
import { SecurityHeaders } from "@/components/security-headers"
import "./globals.css"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Q2 Token Platform",
    template: "%s | Q2 Token Platform",
  },
  description: "Enterprise-grade DeFi platform with advanced security features",
  keywords: ["DeFi", "Blockchain", "Trading", "Staking", "Bridge", "Governance", "Security", "Enterprise"],
  authors: [
    {
      name: "Q2 Token Platform Team",
      url: "https://q2token.com",
    },
  ],
  creator: "Q2 Token Platform",
  publisher: "Q2 Token Platform",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://q2token.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "fa-IR": "/fa",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Q2 Token Platform",
    description: "Enterprise-grade DeFi platform with advanced security features",
    siteName: "Q2 Token Platform",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Q2 Token Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Q2 Token Platform",
    description: "Enterprise-grade DeFi platform with advanced security features",
    images: ["/og-image.png"],
    creator: "@q2token",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION,
    },
  },
  other: {
    "facebook-domain-verification": process.env.FB_DOMAIN_VERIFICATION,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: "resizes-content",
}

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    lang: string
  }
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html lang={params.lang || "en"} suppressHydrationWarning className="scroll-smooth">
      <head>
        <SecurityHeaders />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Q2 Token" />
        
        {/* Preload critical resources */}
        <link rel="preload" href={fontSans.variable} as="style" />
        <link rel="preload" href={fontMono.variable} as="style" />
        
        {/* Security: Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        
        {/* Performance: DNS prefetch */}
        <link rel="dns-prefetch" href="https://api.q2token.com" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
          "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          storageKey="q2token-theme"
        >
          <CSPostHogProvider>
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
            </div>
            <Toaster />
          </CSPostHogProvider>
        </ThemeProvider>

        {/* Security: Nonce-based scripts */}
        {process.env.NODE_ENV === "production" && (
          <script
            nonce={process.env.CSP_NONCE}
            dangerouslySetInnerHTML={{
              __html: `
                // Security monitoring initialization
                window.__SECURITY_CONFIG__ = {
                  version: '${process.env.NEXT_PUBLIC_APP_VERSION}',
                  env: '${process.env.NODE_ENV}',
                  cspEnabled: true,
                  sentryEnabled: ${Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN)},
                  recaptchaEnabled: ${Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)},
                };

                // Security: Prevent frame embedding
                if (window.top !== window.self) {
                  window.top.location = window.self.location;
                }
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}
