import { Avatar, CaretIcon, Notification } from '@/assets/icon';
import Link from 'next/link';
import { FC } from 'react';

interface ProjectHeaderProps {
  breadcrumbs: string[];
  notificationLinkPage: string;
}

const ProjectHeader: FC<ProjectHeaderProps> = ({ breadcrumbs, notificationLinkPage }) => {
  return (
    <header className="relative flex justify-between items-center px-10 pb-6 pt-12 capitalize ">
      <div className="flex text-[20px] font-medium items-center space-x-2">
        {breadcrumbs.map((breadcrumb, i) => (
          <div key={breadcrumb} className="flex items-center gap-2">
            <span className="text-t-gray-11 capitalize last:text-t-purple">{breadcrumb}</span>
            {i !== breadcrumbs.length - 1 && <CaretIcon />}
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2.5">
        <Avatar />
        <Link href={notificationLinkPage}>
          <Notification />
        </Link>
      </div>
    </header>
  );
};

export { ProjectHeader };
