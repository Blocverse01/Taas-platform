import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        t: {
          gray: "#FCFCFC",
          purple: "#371B89",
          purple2: "rgba(55, 27, 137, 0.6)",
          purple3: "rgba(55, 27, 137, 0.15)",
          purple4: "#1A1A1A",
        },
      },
    },
  },
  plugins: [],
};
export default config;
