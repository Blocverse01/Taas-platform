import Link from "next/link";
import { Dashboard, Integrations } from "@/assets/icon";
import logo from "@/assets/logo.svg";
import { useRouter } from "next/router";
import Image from "next/image";
import { LogoutDialog } from "../logout";

const navItems = [
  {
    name: "overview",
    href: "/dashboard",
    icon: <Dashboard />,
    targetSegment: null,
  },
  {
    name: "integrations",
    href: "/dashboard/integrations",
    icon: <Integrations />,
    targetSegment: "integrations",
  },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="border-r-[1px] border-t-grey-3">
      <div className="flex flex-col h-full justify-between pb-20 gap-8 pt-12 text-center">
        <nav className="flex flex-col gap-6 list-none">
          <p className="text-[12px] font-medium flex items-center text-t-purple  w-fit mx-auto">
            <Image className="mr-2" src={logo} alt="logo" /> TAAS
          </p>
          <div className="mt-6 px-[23px] flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                className={`flex relative justify-center rounded gap-2 py-[10.5px] px-[19px] items-center ${
                  router.pathname === item.href ? "bg-t-purple text-white" : ""
                }`}
                key={item.href}
                href={item.href}
              >
                <span>{item.icon}</span>
                <span className="capitalize">{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
        <div className="ml-9">
          <LogoutDialog />
        </div>
      </div>
    </aside>
  );
};

export { Sidebar };
