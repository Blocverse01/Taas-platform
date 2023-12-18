import type { NextPageWithLayout } from '../_app';
import Link from 'next/link';
import { ComponentProps } from 'react';

import { ProjectsOverview } from '@/components/projectOverview';

import DashboardLayout from '@/components/layout/dashboardLayout';
import { Plus } from '@/assets/icon';
import useSWR from 'node_modules/swr/core/dist/index.mjs';
import { GridListing } from '@/components/gridListing';
import Skeleton from 'react-loading-skeleton';
import { fetcher } from '@/resources/constants';

type Projects = ComponentProps<typeof ProjectsOverview>['projects'];

const DashboardPage: NextPageWithLayout = () => {
  const { data, error } = useSWR<{
    data?: Projects;
  }>('/api/user/projects', fetcher);

  const projects = data?.data;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="font-medium text-t-black text-base">All Projects</p>
        <Link
          href={'/dashboard/projects/create-project'}
          className="px-3 py-4 rounded flex items-center text-white w-max bg-t-purple"
        >
          <Plus width="16" height="16" />
          <span className="ml-2">Create new project</span>
        </Link>
      </div>

      {projects && <ProjectsOverview projects={projects} />}

      {!projects && !error && (
        <GridListing
          items={[{ id: '1' }, { id: '2' }, { id: '3' }]}
          renderItem={(item) => <Skeleton height={210} />}
        />
      )}
    </div>
  );
};

DashboardPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardPage;
