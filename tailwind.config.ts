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
          DEFAULT: "#0B0F17",
          muted: "#0F172A",
        },
        surface: {
          DEFAULT: "#111827",
          hover: "#1F2937",
          elevated: "#374151",
          border: "#1F2937",
          "border-hover": "#374151",
        },
        brand: {
          DEFAULT: "#2563EB",
          hover: "#3B82F6",
          subtle: "rgba(37, 99, 235, 0.12)",
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
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
      }
    },
  },
  plugins: [],
};
export default config;
