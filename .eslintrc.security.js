/**
 * پیکربندی ESLint برای قوانین امنیتی
 * این قوانین به شناسایی مشکلات امنیتی بالقوه در کد کمک می‌کنند
 *
 * @see https://owasp.org/www-community/vulnerabilities/Unsafe_use_of_Eval
 * @see https://github.com/mozilla/eslint-plugin-no-unsanitized
 */

module.exports = {
  plugins: ["security", "no-unsanitized", "sonarjs"],
  extends: ["plugin:security/recommended", "plugin:sonarjs/recommended"],
  rules: {
    // قوانین مربوط به XSS
    "security/no-unsanitized": "error",
    "no-unsanitized/method": "error",
    "no-unsanitized/property": "error",
    "react/no-danger": "warn",
    "react/no-dangerously-set-innerhtml": "error",

    // جلوگیری از استفاده ناامن از eval و توابع مشابه
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-new-func": "error",

    // جلوگیری از نشت اطلاعات حساس
    "no-console": ["warn", { allow: ["warn", "error"] }],

    // قوانین امنیتی SonarJS
    "sonarjs/no-all-duplicated-branches": "error",
    "sonarjs/no-element-overwrite": "error",
    "sonarjs/no-identical-conditions": "error",
    "sonarjs/no-inverted-boolean-check": "error",
    "sonarjs/no-one-iteration-loop": "error",
    "sonarjs/no-redundant-boolean": "error",
    "sonarjs/no-unused-collection": "error",
    "sonarjs/no-use-of-empty-return-value": "error",
    "sonarjs/prefer-immediate-return": "warn",
    "sonarjs/prefer-object-literal": "warn",
    "sonarjs/prefer-single-boolean-return": "warn",

    // قوانین مربوط به رمزنگاری
    "security/detect-possible-timing-attacks": "warn",
    "security/detect-non-literal-regexp": "warn",
    "security/detect-non-literal-fs-filename": "warn",
    "security/detect-eval-with-expression": "error",
    "security/detect-pseudoRandomBytes": "warn",
    "security/detect-buffer-noassert": "error",
    "security/detect-child-process": "warn",
    "security/detect-disable-mustache-escape": "error",
    "security/detect-new-buffer": "warn",
    "security/detect-no-csrf-before-method-override": "error",
    "security/detect-object-injection": "warn",
    "security/detect-unsafe-regex": "warn",
  },
}
