import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        animation: {
            'spin-slow': 'spin 3s linear infinite', 
            'spin-fast': 'spin 1s linear infinite', 
          },
          keyframes: {
            spin: {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          },
        colors: {
            background: "var(--background)",
            foreground: "var(--foreground)",
        },
    },
  },
  plugins: [],
} satisfies Config;
