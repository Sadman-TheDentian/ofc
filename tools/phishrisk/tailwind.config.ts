
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        neon: "#00FF66",
        "cyber-bg": "#0d1117",
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: "#00FF66",
          foreground: "#0d1117",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "#262e39",
          foreground: "#bdffc9"
        },
        accent: {
          DEFAULT: "#1e293b",
          foreground: "#00FF66"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "#181d22",
          foreground: "#ffffff"
        }
      },
      boxShadow: {
        neon: "0 0 10px #00FF66, 0 0 30px #00FF6640",
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
