import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        aeonik: ["var(--font-aeonik)"],
      },
      backgroundColor: {
        t: {
          "faded-purple": "rgba(55, 27, 137, 0.22)",
          "faded-purple2": "rgba(55, 27, 137, 0.1)",
        },
      },
      colors: {
        t: {
          black: "#1A1A1A",
          purple: "#371B89",
        },
      },
    },
  },
  plugins: [],
};
export default config;
