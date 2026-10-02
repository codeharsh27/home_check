import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#0F1115",
          muted: "#14161B",
        },
        surface: {
          DEFAULT: "#16181D",
          hover: "#1E2128",
          elevated: "#242831",
          border: "#262930",
          borderHover: "#363B47",
        },
        brand: {
          DEFAULT: "#D97706",
          hover: "#F59E0B",
          subtle: "rgba(217, 119, 6, 0.12)",
          border: "rgba(217, 119, 6, 0.3)",
        },
        status: {
          verified: "#10B981",
          user: "#3B82F6",
          source: "#8B5CF6",
          estimate: "#F59E0B",
          missing: "#6B7280",
          pro: "#F97316",
          issue: "#EF4444",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      }
    },
  },
  plugins: [],
};
export default config;
