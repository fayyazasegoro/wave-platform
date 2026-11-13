import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#070C18",
          900: "#0B132B",
          850: "#0F1A3A",
          800: "#14214D",
          700: "#1C2D5A",
          600: "#243B70",
        },
        teal: {
          950: "#042F2E",
          900: "#134E4A",
          800: "#115E59",
          700: "#0F766E",
          600: "#0D9488",
          500: "#14B8A6",
          400: "#2DD4BF",
          300: "#5EEAD4",
        },
        ocean: {
          900: "#0C4A6E",
          800: "#075985",
          700: "#0369A1",
          600: "#0284C7",
          500: "#0EA5E9",
          400: "#38BDF8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
