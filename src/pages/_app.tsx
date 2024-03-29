import '@/styles/globals.css';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { aeonikFont } from '@/font/setup';
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect, useRef, useState } from 'react';
import { useSetModalParent } from '@/data/store/zustand/modalSlice';
import { Toaster } from 'react-hot-toast';
import { TAAS_PURPLE } from 'tailwind.config';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GridLoader } from 'react-spinners';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement<P>) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const setModalParent = useSetModalParent();

  const router = useRouter();

  const [pageIsLoading, setPageIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = (_: unknown) => {
      setPageIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setPageIsLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  useEffect(() => {
    if (modalRef.current) {
      setModalParent(modalRef.current);
    }
  }, [setModalParent]);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div>
      {pageIsLoading && (
        <div className="fixed inset-0 z-[9999] h-full w-full flex items-center justify-center bg-white/50 backdrop-blur-[2.5px]">
          <GridLoader color={TAAS_PURPLE} />
        </div>
      )}

      <SessionProvider session={session}>
        <div ref={modalRef} className={`${aeonikFont.variable} font-aeonik`}>
          <Toaster
            toastOptions={{
              className: 'border-t-purple border p-4 text-t-purple',
              success: {
                iconTheme: {
                  primary: TAAS_PURPLE,
                  secondary: 'white',
                },
              },
            }}
          />
          {getLayout(<Component {...pageProps} />)}
        </div>
      </SessionProvider>
    </div>
  );
}
