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
        ink: "#0A1628",
        graphite: "#1F2937",
        steel: "#475569",
        fog: "#94A3B8",
        mist: "#E2E8F0",
        paper: "#F8FAFC",
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
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        display: ["4.5rem", { lineHeight: "1.05", fontWeight: "700" }],
        h1: ["3rem", { lineHeight: "1.15", fontWeight: "700" }],
        h2: ["2.25rem", { lineHeight: "1.2", fontWeight: "600" }],
        h3: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        h4: ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.7", fontWeight: "400" }],
        caption: ["0.875rem", { lineHeight: "1.5", fontWeight: "500" }],
        eyebrow: ["0.75rem", { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0.12em" }],
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindAnimate],
};
export default config;
