import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        textcolor: "var(--textcolor)"
        // darkpurple: "#635FC7",
        // darkpurple: "hsl(242°, 48%, 58%)",
        // lightpurple: "hsl(243°, 100%, 82%)",
        // black: "#000112",
        // verydarkgrey: "#20212C",
        // darkgrey: "#2B2C37",
        // white: "#ffffff"
      }
    }
  },
  plugins: []
} satisfies Config;
