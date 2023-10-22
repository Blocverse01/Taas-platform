import "@/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { aeonikFont } from "@/font/setup";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useRef } from "react";
import { useSetModalParent } from "@/lib/zustand/modalSlice";
import { Toaster } from "react-hot-toast";
import { TAAS_PURPLE } from "tailwind.config";
import { SessionProvider } from "next-auth/react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement<P>) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const setModalParent = useSetModalParent();
  const getLayout = Component.getLayout ?? ((page) => page);
  useEffect(() => {
    if (modalRef.current) {
      setModalParent(modalRef.current);
    }
  }, [setModalParent]);

  return (
    <SessionProvider session={session}>
      <div ref={modalRef} className={`${aeonikFont.variable} font-aeonik`}>
        <Toaster
          toastOptions={{
            className: "border-t-purple border p-4 text-t-purple",
            success: {
              iconTheme: {
                primary: TAAS_PURPLE,
                secondary: "white",
              },
            },
          }}
        />
        {getLayout(<Component {...pageProps} />)}
      </div>
    </SessionProvider>
  );
}
