module.exports = {
  extends: ["next/core-web-vitals"],

  plugins: ["security"],

  rules: {
    // Security-specific rules
    "security/detect-object-injection": "error",
    "security/detect-non-literal-regexp": "error",
    "security/detect-unsafe-regex": "error",
    "security/detect-buffer-noassert": "error",
    "security/detect-child-process": "error",
    "security/detect-disable-mustache-escape": "error",
    "security/detect-eval-with-expression": "error",
    "security/detect-no-csrf-before-method-override": "error",
    "security/detect-non-literal-fs-filename": "error",
    "security/detect-non-literal-require": "error",
    "security/detect-possible-timing-attacks": "error",
    "security/detect-pseudoRandomBytes": "error",

    // General security best practices
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "error",
    "no-alert": "error",
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-new-func": "error",
    "no-script-url": "error",

    // Prevent potential XSS
    "react/no-danger": "error",
    "react/no-danger-with-children": "error",

    // Prevent potential injection attacks
    "no-template-curly-in-string": "error",

    // Enforce secure coding practices
    "prefer-const": "error",
    "no-var": "error",
    eqeqeq: ["error", "always"],

    // Custom rules for Q2 Platform
    "no-restricted-globals": [
      "error",
      {
        name: "localStorage",
        message: "Use secure storage utilities instead of direct localStorage access",
      },
      {
        name: "sessionStorage",
        message: "Use secure storage utilities instead of direct sessionStorage access",
      },
    ],

    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["crypto"],
            message: "Use our secure crypto utilities instead of direct crypto imports",
          },
        ],
      },
    ],
  },

  overrides: [
    {
      files: ["src/lib/crypto/**/*.ts", "src/core/encryption/**/*.ts"],
      rules: {
        "no-restricted-imports": "off",
      },
    },
    {
      files: ["src/pages/api/**/*.ts", "src/app/api/**/*.ts"],
      rules: {
        "no-console": "off",
        "security/detect-non-literal-fs-filename": "warn",
      },
    },
    {
      files: ["tests/**/*.ts", "**/*.test.ts", "**/*.test.tsx"],
      rules: {
        "no-console": "off",
        "security/detect-object-injection": "off",
      },
    },
    {
      files: ["*.config.js", "*.config.ts", ".eslintrc.js", "scripts/**/*.js"],
      rules: {
        "no-console": "off",
        "no-undef": "off",
        "security/detect-child-process": "off",
      },
    },
  ],

  env: {
    browser: true,
    node: true,
    es2022: true,
    jest: true,
  },

  settings: {
    react: {
      version: "detect",
    },
  },

  ignorePatterns: ["node_modules/", ".next/", "out/", "build/", "dist/", "coverage/", "*.min.js", "public/"],
}
