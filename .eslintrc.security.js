module.exports = {
  extends: ["next/core-web-vitals", "@typescript-eslint/recommended", "plugin:security/recommended"],
  plugins: ["@typescript-eslint", "security"],
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

    // TypeScript security rules
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",

    // General security best practices
    "no-console": "warn",
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
    "no-undef": "error",

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
      files: ["src/core/encryption/**/*.ts"],
      rules: {
        "no-restricted-imports": "off", // Allow crypto imports in encryption modules
      },
    },
    {
      files: ["tests/**/*.ts", "**/*.test.ts"],
      rules: {
        "no-console": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],

  env: {
    browser: true,
    node: true,
    es2021: true,
  },

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    react: {
      version: "detect",
    },
  },
}
