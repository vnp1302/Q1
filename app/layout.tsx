import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import "./globals.css"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
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
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Q2 Token" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Security: Prevent clickjacking
              if (window.top !== window.self) {
                window.top.location = window.self.location;
              }
              
              // Security: Disable right-click in production
              if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
                document.addEventListener('contextmenu', function(e) {
                  e.preventDefault();
                });
                
                document.addEventListener('keydown', function(e) {
                  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
                    e.preventDefault();
                  }
                });
              }
            `,
          }}
        />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontMono.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
          <Toaster />
        </ThemeProvider>

        {/* Security: CSP Nonce Script */}
        <script
          nonce={process.env.CSP_NONCE}
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize security monitoring
              window.__SECURITY_CONFIG__ = {
                cspEnabled: ${process.env.NODE_ENV === "production"},
                version: '${process.env.NEXT_PUBLIC_APP_VERSION}',
                environment: '${process.env.NODE_ENV}',
              };
            `,
          }}
        />
      </body>
    </html>
  )
}
