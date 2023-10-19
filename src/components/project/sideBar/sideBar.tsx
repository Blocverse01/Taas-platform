"use client";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import { useRouter } from "next/router";
import Image from "next/image";
import { FC } from "react";
import {
  Assets,
  Dashboard,
  Authorization,
  Settings,
  TeamIcon,
} from "@/assets/icon";

interface ProjectSidebarProps {
  projectId: string;
  projectName: string;
}

const ProjectSidebar: FC<ProjectSidebarProps> = ({
  projectId,
  projectName,
}) => {
  const router = useRouter();

  const navItems = [
    {
      name: "dashboard",
      href: `/projects/${projectId}`,
      icon: <Dashboard />,
    },
    {
      name: "assets",
      href: `/projects/${projectId}/assets`,
      icon: <Assets />,
    },
    {
      name: "team",
      href: `/projects/${projectId}/team`,
      icon: <TeamIcon />,
    },
    {
      name: "settings",
      href: `/projects/${projectId}/settings`,
      icon: <Settings />,
    },
    {
      name: "authorization",
      href: `/projects/${projectId}/authorization`,
      icon: <Authorization />,
    },
  ];

  return (
    <aside className="border-r-[1px] border-t-grey-3">
      <div className="flex flex-col gap-8 pt-12 text-center">
        <nav className="flex flex-col gap-6 list-none">
          <p className="text-[12px] font-medium flex items-center text-t-purple  w-fit mx-auto">
            <Image className="mr-2" src={logo} alt="logo" /> TAAS
          </p>
          <div className="mt-6 px-2">
            {navItems.map((item) => (
              <Link
                className={`flex relative rounded gap-2 p-4 pl-16 items-center ${
                  router.pathname === item.href ? "bg-t-purple text-white" : ""
                }`}
                key={item.href}
                href={item.href}
              >
                <span className="absolute left-8">{item.icon}</span>
                <span className="capitalize">{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export { ProjectSidebar };
