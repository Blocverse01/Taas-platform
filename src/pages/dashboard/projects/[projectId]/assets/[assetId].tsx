import ProjectLayout from "@/components/layout/projectLayout";
import { AssetPage } from "@/components/project/asset/assetPage";
import { getProjectAssetPageProp } from "@/lib/taas-api/project/page-utils";
import { NextPageWithLayout } from "@/pages/_app";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type Asset = Required<Awaited<ReturnType<typeof getProjectAssetPageProp>>>["asset"];

export const getServerSideProps = (async (context) => {
  const { asset, redirect } = await getProjectAssetPageProp(context);

  if (redirect) {
    return { redirect };
  }

  return { props: { asset } };
}) satisfies GetServerSideProps<{
  asset: Asset;
}>;

const ProjectAssetPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ asset }) => {
  return <AssetPage assetType={asset.type} asset={asset} />;
};

ProjectAssetPage.getLayout = (page) => (
  <ProjectLayout
    projectId={page.props.asset.project.id}
    breadcrumbs={[page.props.asset.project.name, "assets", page.props.asset.name]}
  >
    {page}
  </ProjectLayout>
);

export default ProjectAssetPage;
