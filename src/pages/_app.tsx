import "@/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { aeonikFont } from "@/font/setup";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useRef } from "react";
import { useSetModalParent } from "@/lib/zustand/modalSlice";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const setModalParent = useSetModalParent();
  const getLayout = Component.getLayout ?? ((page) => page);
  useEffect(() => {
    if (modalRef.current) {
      setModalParent(modalRef.current);
    }
  }, [setModalParent]);

  return (
    <div ref={modalRef} className={`${aeonikFont.variable} font-aeonik`}>
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}
