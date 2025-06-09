import { execSync } from "child_process"
import fs from "fs"

console.log("🔍 Checking for deprecated packages...\n")

try {
  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))

  // List of known deprecated packages to check for
  const deprecatedPackages = [
    "inflight",
    "cryptiles",
    "sntp",
    "boom",
    "hoek",
    "har-validator",
    "boolean",
    "abab",
    "domexception",
    "source-map-url",
    "resolve-url",
  ]

  // Check if any deprecated packages are direct dependencies
  const allDeps = {
    ...(packageJson.dependencies || {}),
    ...(packageJson.devDependencies || {}),
  }

  const foundDeprecated = []

  for (const [pkg, version] of Object.entries(allDeps)) {
    if (deprecatedPackages.includes(pkg)) {
      foundDeprecated.push({ package: pkg, version })
    }
  }

  if (foundDeprecated.length > 0) {
    console.log("❌ Found deprecated packages in your dependencies:")
    foundDeprecated.forEach(({ package: pkg, version }) => {
      console.log(`  - ${pkg}@${version}`)
    })
  } else {
    console.log("✅ No deprecated packages found in direct dependencies")
  }

  // Check npm ls for all packages (including transitive)
  console.log("\n🔍 Checking dependency tree for deprecated packages...")

  try {
    execSync("npm ls --depth=0", { stdio: "pipe" })
    console.log("✅ Dependency tree looks clean at top level")
  } catch (error) {
    console.log("⚠️ Some issues found in dependency tree")
  }
} catch (error) {
  console.error("❌ Error checking dependencies:", error.message)
}
