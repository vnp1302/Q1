module.exports = {
  extends: [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking",
    "plugin:security/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],

  plugins: ["@typescript-eslint", "security", "react-hooks", "jsx-a11y", "import"],

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },

  rules: {
    // Security-specific rules (Enhanced)
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
    "security/detect-new-buffer": "error",
    "security/detect-bidi-characters": "error",

    // TypeScript security rules (Enhanced)
    "@typescript-eslint/no-explicit-any": "error", // Changed from warn to error
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/strict-boolean-expressions": "warn",

    // General security best practices (Enhanced)
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "error",
    "no-alert": "error",
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-new-func": "error",
    "no-script-url": "error",
    "no-proto": "error",
    "no-iterator": "error",
    "no-with": "error",

    // Prevent potential XSS (Enhanced)
    "react/no-danger": "error",
    "react/no-danger-with-children": "error",
    "react/jsx-no-script-url": "error",
    "react/jsx-no-target-blank": [
      "error",
      {
        allowReferrer: false,
        enforceDynamicLinks: "always",
      },
    ],

    // Prevent potential injection attacks
    "no-template-curly-in-string": "error",

    // Enforce secure coding practices
    "prefer-const": "error",
    "no-var": "error",
    "no-undef": "error",
    eqeqeq: ["error", "always"],
    curly: ["error", "all"],

    // Import security
    "import/no-dynamic-require": "error",
    "import/no-webpack-loader-syntax": "error",

    // Custom rules for Q2 Platform (Enhanced)
    "no-restricted-globals": [
      "error",
      {
        name: "localStorage",
        message: "Use secure storage utilities from @/lib/secure-storage instead of direct localStorage access",
      },
      {
        name: "sessionStorage",
        message: "Use secure storage utilities from @/lib/secure-storage instead of direct sessionStorage access",
      },
      {
        name: "document.cookie",
        message: "Use secure cookie utilities from @/lib/cookies instead of direct cookie access",
      },
      {
        name: "window.location",
        message: "Use Next.js router for navigation instead of direct window.location",
      },
    ],

    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["crypto", "node:crypto"],
            message: "Use our secure crypto utilities from @/lib/crypto instead of direct crypto imports",
          },
          {
            group: ["fs", "node:fs"],
            message: "File system access should be handled in API routes only",
          },
          {
            group: ["child_process", "node:child_process"],
            message: "Child process execution is not allowed in client code",
          },
        ],
        paths: [
          {
            name: "axios",
            message: "Use our configured HTTP client from @/lib/http-client instead of direct axios",
          },
          {
            name: "jsonwebtoken",
            message: "Use JWT utilities from @/lib/auth instead of direct jsonwebtoken",
          },
        ],
      },
    ],

    // Additional security rules for trading platform
    "no-restricted-syntax": [
      "error",
      {
        selector: "CallExpression[callee.name='eval']",
        message: "eval() is forbidden for security reasons",
      },
      {
        selector: "CallExpression[callee.property.name='innerHTML']",
        message: "innerHTML can lead to XSS vulnerabilities. Use textContent or React rendering",
      },
      {
        selector: "CallExpression[callee.property.name='outerHTML']",
        message: "outerHTML can lead to XSS vulnerabilities. Use React rendering",
      },
    ],

    // Environment-specific rules
    "no-process-env": "warn", // Warn about direct process.env usage
    "no-process-exit": "error",

    // React Hooks rules
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // Accessibility rules
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-has-content": "error",
    "jsx-a11y/click-events-have-key-events": "error",
    "jsx-a11y/no-static-element-interactions": "error",
  },

  overrides: [
    // Encryption modules - Allow crypto imports
    {
      files: ["src/lib/crypto/**/*.ts", "src/lib/encryption/**/*.ts", "src/core/encryption/**/*.ts"],
      rules: {
        "no-restricted-imports": "off",
        "security/detect-pseudoRandomBytes": "off", // Allow in crypto modules
      },
    },

    // API routes - Allow Node.js modules
    {
      files: ["src/pages/api/**/*.ts", "src/app/api/**/*.ts"],
      rules: {
        "no-restricted-imports": "off",
        "no-console": "off",
        "security/detect-non-literal-fs-filename": "warn", // Warn instead of error
      },
    },

    // Test files - Relaxed rules
    {
      files: ["tests/**/*.ts", "**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx", "__tests__/**/*.ts"],
      rules: {
        "no-console": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "security/detect-object-injection": "off",
        "no-restricted-imports": "off",
      },
    },

    // Configuration files
    {
      files: ["*.config.js", "*.config.ts", ".eslintrc.js", "tailwind.config.js", "next.config.js"],
      rules: {
        "no-console": "off",
        "@typescript-eslint/no-var-requires": "off",
        "no-undef": "off",
      },
    },

    // Scripts and tools
    {
      files: ["scripts/**/*.js", "scripts/**/*.ts"],
      rules: {
        "no-console": "off",
        "no-process-exit": "off",
        "security/detect-child-process": "off",
        "security/detect-non-literal-fs-filename": "off",
      },
    },

    // Trading bot specific files
    {
      files: ["src/trading/**/*.ts", "src/bot/**/*.ts"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "error", // Stricter for trading logic
        "no-console": ["error", { allow: ["warn", "error"] }], // Only allow warnings and errors
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
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
  },

  ignorePatterns: ["node_modules/", ".next/", "out/", "build/", "dist/", "coverage/", "*.min.js", "public/"],
}
