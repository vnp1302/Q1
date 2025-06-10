module.exports = {
  extends: [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "plugin:security/recommended",
    "plugin:sonarjs/recommended",
  ],
  plugins: ["@typescript-eslint", "security", "no-unsanitized", "sonarjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  rules: {
    // Security Rules
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

    // No Unsanitized Rules
    "no-unsanitized/method": "error",
    "no-unsanitized/property": "error",

    // React Security
    "react/no-dangerously-set-inner-html": "error",
    "react/jsx-no-script-url": "error",
    "react/jsx-no-target-blank": "error",

    // TypeScript Security
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-return": "error",

    // SonarJS Rules
    "sonarjs/no-duplicate-string": "error",
    "sonarjs/cognitive-complexity": ["error", 15],
    "sonarjs/no-identical-functions": "error",
    "sonarjs/no-redundant-boolean": "error",

    // General Security
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-new-func": "error",
    "no-script-url": "error",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": "error",
    "no-alert": "error",

    // Import Security
    "import/no-dynamic-require": "error",
    "import/no-webpack-loader-syntax": "error",
  },
  overrides: [
    {
      files: ["**/*.test.{js,jsx,ts,tsx}", "**/__tests__/**/*"],
      env: {
        jest: true,
      },
      rules: {
        "security/detect-non-literal-fs-filename": "off",
        "no-console": "off",
      },
    },
    {
      files: ["scripts/**/*", "next.config.js", "tailwind.config.js"],
      rules: {
        "security/detect-non-literal-require": "off",
        "security/detect-non-literal-fs-filename": "off",
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
}
