import logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

interface SubPageLayoutProps {
  children: React.ReactNode;
}

// Todo: consider the relevance of adding this to global constants
const APP_NAME = "TAAS";

export default function SubPageLayout({ children }: SubPageLayoutProps) {
  return (
    <section className="bg-white text-t-black min-h-screen relative w-full h-full">
      <header className="px-6 py-5 md:px-24 md:py-[50px]">
        <Link href="/" className="flex items-center gap-1">
          <Image src={logo} alt="logo" />
          <span className="text-t-purple text-xs font-medium tracking-[1.2px]">
            {APP_NAME}
          </span>
        </Link>
      </header>
      <main className="flex items-center justify-center h-[calc(100vh-80px)] md:h-[calc(100vh-200px)]">
        {children}
      </main>
    </section>
  );
}
