import type { Config } from "tailwindcss"
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          main: "#1a237e",
          light: "#534bae",
          dark: "#000051",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          main: "#006064",
          light: "#428e92",
          dark: "#00363a",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        neutral: {
          main: "#616161",
          light: "#8e8e8e",
          dark: "#373737",
          DEFAULT: "#616161",
        },
        text: {
          primary: "#000000",
          secondary: "#212121",
          inverted: "#ffffff",
        },
        background: {
          default: "#f5f5f5",
          paper: "#ffffff",
          dark: "#121212",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        small: "4px",
        medium: "8px",
        large: "12px",
      },
      fontFamily: {
        sans: ["'Vazir'", "'Roboto'", "sans-serif"],
      },
      fontSize: {
        h1: ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["2rem", { lineHeight: "1.3", fontWeight: "600" }],
        body1: ["1rem", { lineHeight: "1.5", fontWeight: "400" }],
        button: ["0.875rem", { lineHeight: "1.4", fontWeight: "500" }],
      },
      spacing: {
        unit: "8px",
        section: "80px",
        card: "24px",
      },
      boxShadow: {
        low: "0 2px 4px rgba(0,0,0,0.1)",
        medium: "0 4px 12px rgba(0,0,0,0.15)",
        high: "0 8px 24px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
