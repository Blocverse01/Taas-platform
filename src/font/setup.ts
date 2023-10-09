import localFont from "next/font/local";

export const aeonikFont = localFont({
  src: [
    {
      path: "./aeonik/AeonikTRIAL-Bold.otf",
      weight: "700",
      style: "normal",
    },

    {
      path: "./aeonik/AeonikTRIAL-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./aeonik/AeonikTRIAL-Light.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./aeonik/AeonikTRIAL-LightItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./aeonik/AeonikTRIAL-Regular.otf",
      weight: "400",
      style: "normal",
    },

    {
      path: "./aeonik/AeonikTRIAL-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-aeonik",
});
