const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript و ESLint تنظیمات
  typescript: {
    ignoreBuildErrors: false, // بهتر است false باشد برای تولید
  },
  eslint: {
    ignoreDuringBuilds: false, // بهتر است false باشد برای تولید
  },

  // متغیرهای محیطی
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    BUILD_TIME: new Date().toISOString(),
  },

  // تنظیمات امنیتی Headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdnjs.cloudflare.com https://unpkg.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
              "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' wss: https: ws:",
              "media-src 'self' https:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=(), payment=(), usb=()",
          },
        ],
      },
      // API Headers جداگانه
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NODE_ENV === "production" ? "https://yourdomain.com" : "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, X-Requested-With",
          },
          {
            key: "Access-Control-Max-Age",
            value: "86400",
          },
        ],
      },
    ]
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/dashboard",
        permanent: false,
      },
      {
        source: "/login",
        destination: "/auth/signin",
        permanent: false,
      },
    ]
  },

  // Rewrites برای API versioning
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "/api/:path*",
      },
    ]
  },

  // Webpack تنظیمات
  webpack: (config, { dev, isServer }) => {
    // Path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/lib": path.resolve(__dirname, "src/lib"),
      "@/types": path.resolve(__dirname, "src/types"),
    }

    // Security و optimization plugins
    if (!dev) {
      config.plugins.push(
        new (require("webpack").DefinePlugin)({
          "process.env.BUILD_TIME": JSON.stringify(new Date().toISOString()),
          "process.env.BUILD_VERSION": JSON.stringify(process.env.npm_package_version || "1.0.0"),
        }),
      )
    }

    // WebSocket support
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    return config
  },

  // تنظیمات تولید
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true, // بهتر است true باشد برای کش

  // تنظیمات تصاویر
  images: {
    domains: ["localhost", "yourdomain.com", "api.binance.com", "cdn.jsdelivr.net"],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // API routes تنظیمات
  api: {
    bodyParser: {
      sizeLimit: "2mb", // افزایش برای فایل‌های بزرگتر
    },
    responseLimit: "10mb",
    externalResolver: true,
  },

  // Experimental features
  experimental: {
    serverComponentsExternalPackages: ["prisma", "@prisma/client"],
    optimizePackageImports: ["lucide-react", "recharts"],
  },

  // Output configuration
  output: "standalone",

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
}

module.exports = nextConfig
