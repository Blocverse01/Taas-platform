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
      path: "./aeonik/Aeonik-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./aeonik/Aeonik-MediumItalic.otf",
      weight: "500",
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
