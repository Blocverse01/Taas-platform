import ProjectLayout from '@/components/layout/projectLayout';
import { ProjectDashboard } from '@/components/project/dashboard';
import { getDummyProjectAnalytics } from '@/components/project/dashboard/demoData';
import { getProjectPageProp } from '@/data/adapters/server/taas-api/project/page-utils';
import { NextPageWithLayout } from '@/pages/_app';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

type Project = Required<Awaited<ReturnType<typeof getProjectPageProp>>>['project'];

export const getServerSideProps = (async (context) => {
  const { project, redirect } = await getProjectPageProp(context);

  if (redirect) {
    return { redirect };
  }

  return { props: { project } };
}) satisfies GetServerSideProps<{
  project: Project;
}>;

const ProjectDashboardPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ project }) => {
  return <ProjectDashboard projectId={project.id} getAnalytics={getDummyProjectAnalytics} />;
};

ProjectDashboardPage.getLayout = (page) => (
  <ProjectLayout
    breadcrumbs={[page.props.project.name, 'dashboard']}
    projectId={page.props.project.id}
  >
    {page}
  </ProjectLayout>
);

export default ProjectDashboardPage;
