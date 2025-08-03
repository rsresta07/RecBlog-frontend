import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-bg": "#F1F2F6", // for page and card backgrounds
        primary: "#273FA1", // for branding, headings, buttons
        secondary: "#6B85ED", // for hover, borders, tags
        accent: "#F28F3B", // for CTA, delete buttons, highlights
        "dark-text": "#1E1E1E", // for readable dark text
        "light-text": "#F1F2F6", // for readable light text
        "heart-red": "#ba0001",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
