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
        // ── Dark evaluation workspace tokens ──────────────────────────
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
        },
        // ── Light landing page tokens (Homera-inspired) ───────────────
        cream: {
          DEFAULT: "#F4F1EC",
          dark: "#EDE9E2",
          border: "#E2DED6",
        },
        forest: {
          DEFAULT: "#2A5C2A",
          dark: "#1A2318",
          mid: "#243022",
          light: "#3D7A3D",
        },
        ink: {
          DEFAULT: "#111111",
          secondary: "#555555",
          muted: "#999999",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
