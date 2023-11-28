import { ApiIntegrations } from '@/components/apiIntegrations';
import { ComponentProps } from 'react';
import { NextPageWithLayout } from '../_app';
import { fetcher, getCurrentAuthUser } from '@/resources/constants';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getUserProjects } from '@/data/adapters/server/taas-api/project/getUserProjects';
import DashboardLayout from '@/components/layout/dashboardLayout';
import useSWR from 'swr';
import { ReloadPage } from '@/components/reloadPage';
import Skeleton from 'react-loading-skeleton';

type ApiIntegrationsProps = ComponentProps<typeof ApiIntegrations>;

export const getServerSideProps = (async (context) => {
  const authSession = await getCurrentAuthUser(context.req, context.res);
  if (!authSession) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const projects = await getUserProjects(authSession.user, true);

  return { props: { projects } };
}) satisfies GetServerSideProps<{
  projects: ApiIntegrationsProps['projects'];
}>;

const generateApiKey = async (projectId: string) => {
  const response = await fetch('/api/user/api-keys/create', {
    body: JSON.stringify({
      projectId,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw Error('Invalid response');

  const data: {
    data: string;
  } = await response.json();

  return data.data;
};

const deleteApiKey = async (apiKeyId: string) => {
  const response = await fetch('/api/user/api-keys/delete', {
    body: JSON.stringify({
      apiKeyId,
    }),
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw Error('Invalid response');
};

const IntegrationsPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ projects }) => {
  const { data, error, mutate } = useSWR<{
    data?: ApiIntegrationsProps['apiKeys'];
  }>(`/api/user/api-keys`, fetcher);

  const apiKeys = data?.data;

  if (!apiKeys) {
    if (error) return <ReloadPage />;
    return (
      <div className="flex flex-col gap-[44px]">
        <Skeleton width={600} height={48} />
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((value) => (
            <Skeleton key={value} height={60} />
          ))}
        </div>
        <div className="flex justify-center">
          <Skeleton width={339} height={48} />
        </div>
      </div>
    );
  }

  return (
    <ApiIntegrations
      deleteApiKey={async (apiKeyId) => {
        await deleteApiKey(apiKeyId);
        mutate();
      }}
      generateApiKey={async (projectId) => {
        const apiKey = await generateApiKey(projectId);
        mutate();
        return apiKey;
      }}
      projects={projects}
      apiKeys={apiKeys}
    />
  );
};

IntegrationsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default IntegrationsPage;
