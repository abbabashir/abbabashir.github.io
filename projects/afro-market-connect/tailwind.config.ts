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
        brand: {
          // New Brand Palette
          forest: "#1A4D3A",       // #1A4D3A - Primary Brand Forest Green
          "forest-dark": "#13382A",
          "forest-light": "#E8EFEA",
          primary: "#1A4D3A",
          blue: "#1A4D3A",          // Aliased to primary #1A4D3A for full theme consistency
          "blue-dark": "#13382A",
          "blue-light": "#E8EFEA",
          orange: "#CC5500",        // #CC5500 - Burnt Orange / Terracotta Accent
          terracotta: "#CC5500",
          tangerine: "#CC5500",     // Aliased for conversion buttons & badges
          accent: "#CC5500",
          gold: "#FFD700",          // #FFD700 - Vibrant African Gold
          "accent-gold": "#FFD700",
          canvas: "#FDF6E3",        // #FDF6E3 - Warm Canvas Surface
          surface: "#FFFFFF",
          charcoal: "#333333",      // #333333 - Deep Charcoal Typography
          muted: "#555555",
          border: "#E2D9C8",
          emerald: "#1A4D3A",
        },
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        elevated: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
