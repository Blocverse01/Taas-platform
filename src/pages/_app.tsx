import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { aeonikFont } from "@/font/setup";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useRef } from "react";
import { useSetModalParent } from "@/lib/zustand/modalSlice";
import { Toaster } from "react-hot-toast";
import { TAAS_PURPLE } from "tailwind.config";

export default function App({ Component, pageProps }: AppProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const setModalParent = useSetModalParent();

  useEffect(() => {
    if (modalRef.current) {
      setModalParent(modalRef.current);
    }
  }, [setModalParent]);

  return (
    <div ref={modalRef} className={`${aeonikFont.variable} font-aeonik`}>
      <Toaster
        toastOptions={{
          className: "border-t-purple border p-4 text-t-purple",
          success: {
            iconTheme: {
              primary: TAAS_PURPLE,
              secondary: "black",
            },
          },
        }}
      />
      <Component {...pageProps} />
    </div>
  );
}
