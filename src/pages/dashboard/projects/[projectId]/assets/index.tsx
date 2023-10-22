import { GridListing } from "@/components/gridListing";
import ProjectLayout from "@/components/layout/projectLayout";
import { AssetsPage } from "@/components/project/asset";
import { ReloadPage } from "@/components/reloadPage";
import { getProjectPageProp } from "@/lib/taas-api/project/page-utils";
import { NextPageWithLayout } from "@/pages/_app";
import { fetcher } from "@/utils/constants";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ComponentProps } from "react";
import Skeleton from "react-loading-skeleton";
import useSWR from "swr";

type Project = Required<Awaited<ReturnType<typeof getProjectPageProp>>>["project"];

export const getServerSideProps = (async (context) => {
  const { project, redirect } = await getProjectPageProp(context);

  if (redirect) {
    return { redirect };
  }

  return { props: { project } };
}) satisfies GetServerSideProps<{
  project: Project;
}>;

type Assets = ComponentProps<typeof AssetsPage>["assets"];

const ProjectAssetsPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ project }) => {
  const { data, error } = useSWR<{
    data?: Assets;
  }>(`/api/user/projects/${project.id}/assets`, fetcher);

  const assets = data?.data;

  if (!assets) {
    if (error) return <ReloadPage />;
    return (
      <div className="flex flex-col gap-[44px]">
        <div className="flex justify-between">
          <Skeleton width={150} height={48} />
          <Skeleton width={150} height={48} />
        </div>
        <GridListing items={[{ id: "1" }, { id: "2" }, { id: "3" }]} renderItem={(item) => <Skeleton height={210} />} />
      </div>
    );
  }
  return <AssetsPage assetType={project.assetType} assets={assets} projectId={project.id} />;
};

ProjectAssetsPage.getLayout = (page) => (
  <ProjectLayout projectId={page.props.project.id} breadcrumbs={[page.props.project.name, "assets"]}>
    {page}
  </ProjectLayout>
);

export default ProjectAssetsPage;
