import ProjectLayout from "@/components/layout/projectLayout";
import { PendingAuthorizations } from "@/components/project/pendingAuthorizations";
import { getSafeService } from "@/lib/safe";
import { getProjectPageProp } from "@/lib/taas-api/project/page-utils";
import { getTeamMembers } from "@/lib/taas-api/team";
import { NextPageWithLayout } from "@/pages/_app";
import { ASSET_TOKEN, PLATFORM_ENTRY } from "@/utils/web3/abis";
import { getContractAddress } from "@/utils/web3/contracts";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ComponentProps, useState } from "react";
import { Address, decodeFunctionData, formatEther } from "viem";
import useSWR from "swr";
import { AuthorizationBreakdown } from "@/components/project/pendingAuthorizations/authorizationBreakdown/authorizationBreakdown";
import { acceptTransaction } from "@/lib/safe/executeTransaction";
import { executeIssueTokenTransaction } from "@/lib/taas-api/token/issueToken";
import { OLD_PLATFORM_ENTRY_CONTRACTS } from "@/utils/constants";

type Project = Required<Awaited<ReturnType<typeof getProjectPageProp>>>["project"];

type SafeTransactionProps = ComponentProps<typeof PendingAuthorizations>;

export const getServerSideProps = (async (context) => {
  const { project, redirect, user } = await getProjectPageProp(context);

  if (redirect) {
    return { redirect };
  }

  const teamMembers = await getTeamMembers(user.user, project.id);

  return { props: { project, teamMembers } };
}) satisfies GetServerSideProps<{
  project: Project;
}>;

type AuthorizationsProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const AuthorizationsPage: NextPageWithLayout<AuthorizationsProps> = ({ teamMembers, project }) => {
  const key = `projects/${project.id}/authorizations`;

  const { data } = useSWR(key, () => getSafeService().getPendingTransactions(project.multisigController));
  const [selectedAuthorization, setSelectedAuthorization] = useState<
    ReturnType<typeof parseTransaction> & {
      assetDetails: Awaited<ReturnType<typeof getAssetDetails>>;
    }
  >();

  const safeTransactions = data?.results;

  const parseTransaction = (safeTransaction: SafeTransactionProps["safeTransactions"][number]) => {
    if (!safeTransaction.data) throw new Error("Invalid transaction");
    let actionTitle: string | undefined;
    let assetAddress: Address | undefined;
    let toUser: Address | undefined;
    let assetTokenValue: string | undefined;

    const platformEntry = getContractAddress("PLATFORM_ENTRY");

    if (safeTransaction.to == platformEntry || OLD_PLATFORM_ENTRY_CONTRACTS.includes(safeTransaction.to)) {
      const { functionName, args } = decodeFunctionData({
        abi: PLATFORM_ENTRY,
        data: safeTransaction.data as Address,
      });
      const actionTitles: {
        [key in typeof functionName]?: string;
      } = {
        issueToken: "Token Issuance",
      };
      actionTitle = actionTitles[functionName];
      if (functionName === "issueToken") {
        assetAddress = args[1];
        toUser = args[2];
        assetTokenValue = formatEther(args[3]);
      }
    } else {
      const { functionName, args } = decodeFunctionData({
        abi: ASSET_TOKEN,
        data: safeTransaction.data as Address,
      });
      const actionTitles: {
        [key in typeof functionName]?: string;
      } = {
        controllerTransfer: "Token Transfer",
      };
      actionTitle = actionTitles[functionName];
      if (functionName === "controllerTransfer") {
        assetAddress = safeTransaction.to as Address;
        toUser = args[1];
        assetTokenValue = formatEther(args[2]);
      }
    }

    const assumedInitiator = safeTransaction.confirmations![0];

    return {
      actionTitle: actionTitle!,
      assetAddress: assetAddress!,
      initiator: assumedInitiator.owner as Address,
      confirmationsRequired: safeTransaction.confirmationsRequired,
      confirmations: safeTransaction.confirmations ?? [],
      toUser: toUser,
      assetTokenValue: assetTokenValue,
      createdAt: safeTransaction.submissionDate,
      safeTxHash: safeTransaction.safeTxHash as Address,
      isExecuted: safeTransaction.isExecuted,
    };
  };

  const getAssetDetails = async (assetAddress: Address) => {
    const response = await fetch(`/api/user/projects/${project.id}/assets/${assetAddress}`);

    if (!response.ok) throw Error("Invalid response");

    const data: {
      data: {
        name: string;
        id: string;
      };
    } = await response.json();

    return {
      name: data.data.name,
      assetLink: `/dashboard/projects/${project.id}/assets/${data.data.id}`,
    };
  };

  if (!safeTransactions) return <div className="">Fetching authorizations</div>;
  return selectedAuthorization ? (
    <AuthorizationBreakdown
      handleBack={() => setSelectedAuthorization(undefined)}
      authorization={selectedAuthorization}
      assetDetails={selectedAuthorization.assetDetails}
      approveTransaction={async (safeTxHash) => {
        const receipt = await acceptTransaction(project.multisigController, safeTxHash);
        if (!receipt.status) throw new Error("Transaction reverted");
      }}
      executeTransaction={async (safeTxHash) => {
        await executeIssueTokenTransaction(project.multisigController, safeTxHash);
      }}
    />
  ) : (
    <PendingAuthorizations
      selectAuthorization={(authorization) => {
        setSelectedAuthorization(authorization);
      }}
      getAssetDetails={getAssetDetails}
      safeTransactions={safeTransactions}
      parseTransaction={parseTransaction}
    />
  );
};

AuthorizationsPage.getLayout = (page) => (
  <ProjectLayout breadcrumbs={[page.props.project.name, "Authorizations"]} projectId={page.props.project.id}>
    {page}
  </ProjectLayout>
);

export default AuthorizationsPage;
