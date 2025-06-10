const { withSentryConfig } = require("@next/sentry")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core Configuration
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client"],
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  // Security Headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
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
            value: "0",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), camera=(), microphone=(), payment=(), usb=(), bluetooth=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value:
              process.env.NODE_ENV === "production"
                ? "default-src 'none'; script-src 'self' 'nonce-{NONCE}' 'strict-dynamic'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' wss: https:; font-src 'self'; object-src 'none'; media-src 'self'; frame-src 'none'; worker-src 'self'; manifest-src 'self'; base-uri 'self'; form-action 'self'"
                : "default-src 'self' 'unsafe-eval' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' ws: wss:;",
          },
        ],
      },
    ]
  },

  // Environment Variables
  env: {
    ANALYZE: process.env.ANALYZE,
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
  },

  // Image Optimization
  images: {
    domains: ["localhost"],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Internationalization
  i18n: {
    locales: ["en", "fa"],
    defaultLocale: "en",
    localeDetection: true,
  },

  // Redirects and Rewrites
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/dashboard",
        permanent: true,
      },
    ]
  },

  async rewrites() {
    return [
      {
        source: "/api/health",
        destination: "/api/system/health",
      },
    ]
  },

  // Webpack Configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Security: Disable eval in production
    if (!dev) {
      config.devtool = false
    }

    // Bundle Analysis
    if (process.env.ANALYZE === "true") {
      config.plugins.push(
        new webpack.DefinePlugin({
          "process.env.BUNDLE_ANALYZE": JSON.stringify("true"),
        }),
      )
    }

    // Custom Key Injection
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.CUSTOM_KEY": JSON.stringify(process.env.CUSTOM_KEY),
      }),
    )

    return config
  },

  // Output Configuration
  output: "standalone",
  generateEtags: false,
  poweredByHeader: false,
  compress: true,

  // TypeScript Configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint Configuration
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ["app", "src", "components", "lib"],
  },
}

// Sentry Configuration
const sentryWebpackPluginOptions = {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: true,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
}

module.exports = withSentryConfig(withBundleAnalyzer(nextConfig), sentryWebpackPluginOptions)
