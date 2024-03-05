import ProjectLayout from '@/components/layout/projectLayout';
import { RecentActivities } from '@/components/project/dashboard/recentActivities';
import { ActivitiesTemplate } from '@/components/project/dashboard/recentActivities/activitiesTemplate';
import { ReloadPage } from '@/components/reloadPage';
import { getProjectPageProp } from '@/data/adapters/server/taas-api/project/page-utils';
import { NextPageWithLayout } from '@/pages/_app';
import { fetcher } from '@/resources/constants';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next/types';
import { ComponentProps } from 'react';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';

type Project = Required<Awaited<ReturnType<typeof getProjectPageProp>>>['project'];

type Activities = ComponentProps<typeof ActivitiesTemplate>['activities'];

const ActivitiesPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ project }) => {
  const key = `/api/activityLog/getActivityLog?projectId=${project.id}`;

  const { data, error } = useSWR<{
    data: {
      recentActivities: Activities;
    };
  }>(key, fetcher);

  if (error) return <ReloadPage />;

  const recentActivities = data?.data.recentActivities;

  if (!recentActivities)
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((value) => (
          <Skeleton key={value} height={60} />
        ))}
      </div>
    );

  return (
    <div>
      <RecentActivities activities={recentActivities} />
    </div>
  );
};

ActivitiesPage.getLayout = (page) => (
  <ProjectLayout
    breadcrumbs={[page.props.project.name, 'activities']}
    projectId={page.props.project.id}
  >
    {page}
  </ProjectLayout>
);

export const getServerSideProps = (async (context) => {
  const { project, redirect } = await getProjectPageProp(context);

  if (redirect) {
    return { redirect };
  }

  return { props: { project } };
}) satisfies GetServerSideProps<{
  project: Project;
}>;

export default ActivitiesPage;
