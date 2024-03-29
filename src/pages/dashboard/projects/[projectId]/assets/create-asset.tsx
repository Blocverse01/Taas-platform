import SubPageLayout from '@/components/layout/subPageLayout';
import { CreateAsset } from '@/components/project/asset/createAsset';
import { getProjectPageProp } from '@/data/adapters/server/taas-api/project/page-utils';
import { NextPageWithLayout } from '@/pages/_app';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

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

const CreateProjectAsset: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ project }) => {
  return (
    <CreateAsset
      assetType={project.assetType}
      projectId={project.id}
      projectName={project.name}
      projectTokenFactory={project.tokenFactory}
    />
  );
};

CreateProjectAsset.getLayout = (page) => <SubPageLayout>{page} </SubPageLayout>;
export default CreateProjectAsset;
