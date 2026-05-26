import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "24px",
        lg: "48px",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        // Existing tokens preserved for backward compat
        ink: "#0A1628",
        graphite: "#1F2937",
        steel: "#475569",
        fog: "#94A3B8",
        mist: "#E2E8F0",
        white: "#FFFFFF",
        brand: {
          DEFAULT: "#1E40AF",
          dark: "#1E3A8A",
          light: "#3B82F6",
          soft: "#DBEAFE",
        },
        accent: {
          DEFAULT: "#B45309",
          soft: "#FEF3C7",
        },
        success: "#15803D",
        warning: "#A16207",
        danger: "#B91C1C",
        // New extended scales
        navy: {
          950: "#0F1B2D",
          900: "#152238",
          800: "#1B2D4A",
          700: "#1E3A8A",
          600: "#1E40AF",
        },
        gold: {
          700: "#8A6A24",
          600: "#A07A2F",
          500: "#C9A84C",
          400: "#D4B968",
          300: "#E5D29A",
        },
        paper: {
          DEFAULT: "#F8FAFC",
          50: "#FAF8F3",
          100: "#F5F0E8",
          200: "#EEE7D7",
        },
        "ink-scale": {
          900: "#0A0A0A",
          800: "#1A1A1A",
          700: "#2A2A2A",
          500: "#6B6B6B",
          400: "#8A8A8A",
          300: "#C0BFBA",
        },
        surface: "#FFFFFF",
        border: {
          DEFAULT: "#E8E4DA",
          strong: "#D4D2CC",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "Menlo", "monospace"],
      },
      fontSize: {
        // Existing tokens
        display: ["4.5rem", { lineHeight: "1.05", fontWeight: "700" }],
        h1: ["3rem", { lineHeight: "1.15", fontWeight: "700" }],
        h2: ["2.25rem", { lineHeight: "1.2", fontWeight: "600" }],
        h3: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        h4: ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.7", fontWeight: "400" }],
        caption: ["0.875rem", { lineHeight: "1.5", fontWeight: "500" }],
        eyebrow: ["0.75rem", { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0.12em" }],
        // New responsive sizes
        "display-xl": ["clamp(40px, 7vw, 88px)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(32px, 5vw, 64px)", { lineHeight: "1.10", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(28px, 4vw, 48px)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "mono-label": ["12px", { lineHeight: "1.40", letterSpacing: "0.06em" }],
      },
      spacing: {
        section: "120px",
        "section-mobile": "80px",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "marquee-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee": "marquee-scroll 40s linear infinite",
        "marquee-slow": "marquee-scroll 130s linear infinite",
      },
    },
  },
  plugins: [tailwindAnimate],
};
export default config;
