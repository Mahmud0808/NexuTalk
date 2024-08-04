import type { Config } from "tailwindcss";

const config = {
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
      colors: {
        transparent: "var(--color-transparent)",
        bg: "var(--color-bg)",
        "bg-secondary": "var(--color-bg-secondary)",
        border: "var(--color-border)",
        "border-secondary": "var(--color-border-secondary)",
        accent: "var(--color-accent)",
        "accent-dark": "var(--color-accent-dark)",
        text: "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        "text-secondary-dark": "var(--color-text-secondary-dark)",
        "text-secondary-hover": "var(--color-text-secondary-hover)",
        "text-large": "var(--color-text-large)",
        "bg-icon-button": "var(--color-bg-icon-button)",
        "text-icon-button": "var(--color-bg-icon-button-text)",
        "text-icon-button-dim": "var(--color-text-icon-button-dim)",
        "bg-highlight": "var(--color-bg-highlight)",
        "text-info-title": "var(--color-text-info-title)",
        "bg-input": "var(--color-bg-input)",
        "bg-chat-bubble": "var(--color-bg-chat-bubble)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
