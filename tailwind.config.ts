import type { Config } from "tailwindcss";

import type { Config } from "tailwindcss";

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
        // New Pistachio & Apricot palette
        "warm-ivory": "#FAF8F2",
        "soft-pistachio": "#E2E9D8",
        "muted-pistachio": "#B8C8A7",
        "soft-apricot": "#E9C0A8",
        "apricot-brown": "#A77F69",
        "deep-sage": "#485344",
        "pure-white": "#FFFFFF",
        "soft-neutral": "#F3F1E9",
        "subtle-border": "#E5E6DC",
        // Functional colors
        success: "#6A9A6E",
        warning: "#D6A15A",
        error: "#B66A5C",
        info: "#7A8A8A",
        // Preserve legacy colors
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
        sans: ["Plus Jakarta Sans", "var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // New Pistachio & Apricot palette
        "warm-ivory": "#FAF8F2",
        "soft-pistachio": "#E2E9D8",
        "muted-pistachio": "#B8C8A7",
        "soft-apricot": "#E9C0A8",
        "apricot-brown": "#A77F69",
        "deep-sage": "#485344",
        "pure-white": "#FFFFFF",
        "soft-neutral": "#F3F1E9",
        "subtle-border": "#E5E6DC",
        // Functional colors
        success: "#6A9A6E",
        warning: "#D6A15A",
        error: "#B66A5C",
        info: "#7A8A8A",
        // Preserve legacy colors for components still using them
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
        sans: [""Plus Jakarta Sans"", "var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

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
