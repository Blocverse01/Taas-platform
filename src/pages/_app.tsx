import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { aeonikFont } from "@/font/setup";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${aeonikFont.variable} font-aeonik`}>
      <Component {...pageProps} />
    </div>
  );
}
