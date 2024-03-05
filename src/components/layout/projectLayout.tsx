import React from 'react';
import { ProjectHeader } from '../project/header';
import { ProjectSidebar } from '../project/sideBar';

interface ProjectLayoutProps {
  children: React.ReactNode;
  projectId: string;
  breadcrumbs: string[];
}

export default function ProjectLayout({ children, projectId, breadcrumbs }: ProjectLayoutProps) {
  return (
    <section className="min-h-screen text-t-black relative grid grid-cols-[12rem_1fr] w-full h-full">
      <ProjectSidebar projectId={projectId} />
      <main className="bg-white">
        <ProjectHeader
          notificationLinkPage={`/dashboard/projects/${projectId}/activities`}
          breadcrumbs={breadcrumbs}
        />
        <div className="p-6 lg:p-10">{children}</div>
      </main>
    </section>
  );
}
