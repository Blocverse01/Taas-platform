"use client";
import Link from "next/link";
import { Dashboard, Assets, Teams, Settings, Notification } from "../icons";
import { useSelectedLayoutSegment } from "next/navigation";

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
    icon: <Settings />,
    targetSegment: "integrations",
  },
  {
    name: "notifications",
    href: "/dashboard/notifications",
    icon: <Notification />,
    targetSegment: "notifications",
  },
];

const Sidebar = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <aside className="border-r-[1px] border-t-grey-3">
      <div className="flex flex-col gap-8 pt-12 text-center">
        <nav className="flex flex-col gap-6 list-none">
          <p className="text-lg font-bold">TAAS</p>
          {navItems.map((item) => (
            <Link
              className={`flex relative gap-2 p-4 pl-16 items-center  ${
                item.targetSegment === segment ? "bg-t-purple text-black" : ""
              }`}
              key={item.href}
              href={item.href}
            >
              <span className="absolute left-8">{item.icon}</span>
              <span className="capitalize">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export { Sidebar };
