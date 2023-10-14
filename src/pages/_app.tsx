import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { aeonikFont } from "@/font/setup";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useRef } from "react";
import { useSetModalParent } from "@/lib/zustand/modalSlice";

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
      <Component {...pageProps} />
    </div>
  );
}
