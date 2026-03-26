import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class", // or 'media'
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
        secondary: "#f59e0b",
        accent: "#10b981",
      },
    },
  },
  plugins: [],
};

export default config;