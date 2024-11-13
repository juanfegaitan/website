import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      flex: {
        "2": "2 2 0%",
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
      fontSize: {
        title: "clamp(2.1875rem, 1.6397rem + 2.2472vw, 3.4375rem)",
        "sub-title": "clamp(2.1875rem, 1.9136rem + 1.1236vw, 2.8125rem)",
        metrics: "clamp(3.125rem, 2.309vw + 2.527rem, 4.375rem)",
        body1: "clamp(1.125rem, 0.231vw + 1.065rem, 1.25rem)",
        body2: "clamp(1rem, 0.231vw + 0.94rem, 1.125rem)",
      },
      lineHeight: {
        title: "clamp(2.406rem, 4.446vw + 1.256rem, 4.813rem)",
        "sub-title": "clamp(2.5rem, 1.9136rem + 1.1236vw, 3.125rem)",
        metrics: "clamp(4.375rem, 2.425vw + 3.748rem, 5.688rem)",
        body1: "clamp(1.575rem, 0.323vw + 1.491rem, 1.75rem)",
        body2: "clamp(1.125rem, 0.231vw + 1.065rem, 1.25rem)",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", ...fontFamily.sans],
      },
      borderRadius: {
        "2.5xl": "1.25rem",
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [require("tailwindcss-animate")],
};
export default config;
