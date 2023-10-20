import ProjectLayout from "@/components/layout/projectLayout";
import { TeamPage } from "@/components/project/team/teamPage";
import { ReloadPage } from "@/components/reloadPage";
import { getProjectPageProp } from "@/lib/taas-api/project/page-utils";
import { NextPageWithLayout } from "@/pages/_app";
import { fetcher } from "@/utils/constants";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ComponentProps } from "react";
import Skeleton from "react-loading-skeleton";
import useSWR from "swr";

type Project = Required<Awaited<ReturnType<typeof getProjectPageProp>>>["project"];
type TeamMembers = ComponentProps<typeof TeamPage>["teamMembers"];

export const getServerSideProps = (async (context) => {
  const { project, redirect } = await getProjectPageProp(context);

  if (redirect) {
    return { redirect };
  }

  return { props: { project } };
}) satisfies GetServerSideProps<{
  project: Project;
}>;

const ProjectTeamPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ project }) => {
  const { data, error } = useSWR<{
    data?: TeamMembers;
  }>(`/api/user/projects/${project.id}/team`, fetcher);

  const teamMembers = data?.data;

  if (!teamMembers) {
    if (error) return <ReloadPage />;
    return (
      <div className="flex flex-col gap-[44px]">
        <div className="flex justify-between">
          <Skeleton width={600} height={48} />
          <Skeleton width={150} height={48} />
        </div>
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((value) => (
            <Skeleton key={value} height={60} />
          ))}
        </div>
      </div>
    );
  }
  return <TeamPage teamMembers={teamMembers} />;
};

ProjectTeamPage.getLayout = (page) => (
  <ProjectLayout projectId={page.props.project.id} breadcrumbs={[page.props.project.name, "team"]}>
    {page}
  </ProjectLayout>
);

export default ProjectTeamPage;
