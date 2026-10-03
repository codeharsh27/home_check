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
          DEFAULT: "#0A0A0A",
          muted: "#111111",
        },
        surface: {
          DEFAULT: "#141414",
          hover: "#1C1C1C",
          elevated: "#222222",
          border: "#252525",
        },
        brand: {
          DEFAULT: "#5B8BDF",
          hover: "#6E9BE8",
          subtle: "rgba(91, 139, 223, 0.1)",
        },
        status: {
          verified: "#3F9E6C",
          user: "#5B8BDF",
          source: "#9B6FD6",
          estimate: "#D4A017",
          missing: "#666666",
          pro: "#E6832A",
          issue: "#D94F4F",
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
