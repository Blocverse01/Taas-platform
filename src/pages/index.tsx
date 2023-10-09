import Navbar from "@/components/navbar";
import { aeonikFont } from "@/font/setup";
import { MenuItem } from "@/types/types";

export default function Home() {
  const menuItems: MenuItem[] = [
    { title: "Docs", href: "/", isScrollLink: false },
    { title: "Pricing", target: "pricing", href: "/", isScrollLink: true },
    {
      title: "Contact Us",
      target: "contact-us",
      href: "/",
      isScrollLink: true,
    },
  ];

  return (
    <div className={`${aeonikFont.variable} font-aeonik`}>
      <Navbar menuItems={menuItems} isLoggedIn={false} />
      <h1 className=" text-3xl ">Hello</h1>
    </div>
  );
}
