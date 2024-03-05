'use client';
import Link from 'next/link';
import logo from '@/assets/logo.svg';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FC } from 'react';
import { Assets, Dashboard, Authorization, Settings, TeamIcon, Notification } from '@/assets/icon';
import { LogoutDialog } from '@/components/logout/logoutDialog';
import { derivePageTitle } from '@/resources/utils/helperfunctions';
import { logOut } from '@/data/adapters/browser/auth';

interface ProjectSidebarProps {
  projectId: string;
}

const NOT_READY_NAV_ITEM_NAMES = ['settings', 'authorizations'];

const ProjectSidebar: FC<ProjectSidebarProps> = ({ projectId }) => {
  const router = useRouter();

  const pageTitle = derivePageTitle(router.asPath, projectId);

  const navItems = [
    {
      name: 'dashboard',
      href: `/dashboard/projects/${projectId}`,
      icon: <Dashboard />,
    },
    {
      name: 'assets',
      href: `/dashboard/projects/${projectId}/assets`,
      icon: <Assets />,
    },
    {
      name: 'team',
      href: `/dashboard/projects/${projectId}/team`,
      icon: <TeamIcon />,
    },
    {
      name: 'activities',
      href: `/dashboard/projects/${projectId}/activities`,
      icon: <Notification />,
    },
    {
      name: 'settings',
      href: `/dashboard/projects/${projectId}/settings`,
      icon: <Settings />,
    },
    {
      name: 'authorizations',
      href: `/dashboard/projects/${projectId}/authorizations`,
      icon: <Authorization />,
    },
  ].filter((item) => !NOT_READY_NAV_ITEM_NAMES.includes(item.name));

  return (
    <aside className="border-r-[1px] border-t-grey-3">
      <div className="flex flex-col justify-between pb-20 h-full gap-8 pt-12 text-center">
        <nav className="flex flex-col gap-10 list-none">
          <Link
            href="/dashboard"
            className="text-[12px] font-medium flex items-center text-t-purple  w-fit mx-auto"
          >
            <Image className="mr-2" src={logo} alt="logo" /> <span>TAAS</span>
          </Link>
          <div className="mt-6 px-[23px] flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                className={`flex relative rounded gap-2 py-[10.5px] px-[19px] items-center ${
                  pageTitle === item.name ? 'bg-t-purple text-white' : ''
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
        <div className="ml-11">
          <LogoutDialog logout={logOut} />
        </div>
      </div>
    </aside>
  );
};

export { ProjectSidebar };
