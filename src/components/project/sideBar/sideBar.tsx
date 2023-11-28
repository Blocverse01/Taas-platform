'use client';
import Link from 'next/link';
import logo from '@/assets/logo.svg';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FC } from 'react';
import { Assets, Dashboard, Authorization, Settings, TeamIcon } from '@/assets/icon';
import { derivePageTitle } from '@/resources/utils/helperfunctions';

interface ProjectSidebarProps {
  projectId: string;
}

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
      name: 'settings',
      href: `/dashboard/projects/${projectId}/settings`,
      icon: <Settings />,
    },
    {
      name: 'authorizations',
      href: `/dashboard/projects/${projectId}/authorizations`,
      icon: <Authorization />,
    },
  ];

  return (
    <aside className="border-r-[1px] border-t-grey-3">
      <div className="flex flex-col gap-8 pt-12 text-center">
        <nav className="flex flex-col gap-10 list-none">
          <p className="text-[12px] font-medium flex items-center text-t-purple  w-fit mx-auto">
            <Image className="mr-2" src={logo} alt="logo" /> TAAS
          </p>
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
      </div>
    </aside>
  );
};

export { ProjectSidebar };
