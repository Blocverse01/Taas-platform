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
          "faded-purple": "rgba(55, 27, 137, 0.20)",
          "faded-purple2": "rgba(55, 27, 137, 0.1)",
        },
      },
      colors: {
        t: {
          black: "#1A1A1A",
          purple: "#371B89",
          gray: {
            1: "#F9FAFB",
            2: "#FAFAFA",
            3: "#464545",
            4: "#646464",
            5: "#474747",
            6: "#FEFBFB",
            7: "rgba(26, 26, 26, 0.5)",
            8: "#FCFCFC",
            9: "rgba(26, 26, 26, 0.7)",
            10: "#747474",
          },
          red: {
            1: "#C02425",
          },
        },
      },
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
