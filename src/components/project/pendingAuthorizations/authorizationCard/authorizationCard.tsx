import { Caret, TeamIcon } from "@/assets/icon";
import { SafeMultisigConfirmationResponse } from "@safe-global/safe-core-sdk-types";
import useSWR from "node_modules/swr/core/dist/index.mjs";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { Address } from "viem";

interface SafeTransaction {
  safe: string;
  to: string;
  value: string;
  nonce: number;
  data?: string;
  submissionDate: string;
  dataDecoded?: string;
  confirmationsRequired: number;
  confirmations?: SafeMultisigConfirmationResponse[];
  safeTxHash: string;
  isExecuted: boolean;
}

interface ParsedAuthorization {
  actionTitle: string;
  assetAddress: Address;
  confirmationsRequired: number;
  confirmations: SafeMultisigConfirmationResponse[];
  initiator: Address;
  createdAt: string;
  safeTxHash: Address;
  toUser: Address | undefined;
  assetTokenValue: string | undefined;
  isExecuted: boolean;
}

interface AuthorizationCardProps {
  safeTransaction: SafeTransaction;
  parseAuthorization: (safeTransaction: SafeTransaction) => ParsedAuthorization;
  getAssetDetails: (assetAddress: Address) => Promise<{
    name: string;
    assetLink: string;
  }>;
  getApprovals: (safeTxHash: Address) => Promise<string[]>;
  selectAuthorization: (
    authorization: ParsedAuthorization & {
      assetDetails: {
        name: string;
        assetLink: string;
      };
      approvals: string[]
    }
  ) => void;
}

const AuthorizationCard: FC<AuthorizationCardProps> = ({
  safeTransaction,
  parseAuthorization,
  getAssetDetails,
  selectAuthorization,
  getApprovals
}) => {
  const parsedAuthorization = parseAuthorization(safeTransaction);

  const key = `/asset-details/${parsedAuthorization.assetAddress}`;
  const { data: assetDetails } = useSWR(key, () => getAssetDetails(parsedAuthorization.assetAddress));

  const { data: approvedOwners } = useSWR(`/approvals/${parsedAuthorization.safeTxHash}`, () => getApprovals(parsedAuthorization.safeTxHash));

  if (!assetDetails || !approvedOwners)
    return (
      <tr className="bg-t-gray-2 text-t-gray-5 rounded">
        <td className="pr-6">
          <Skeleton height={35} />
        </td>
        <td className="pr-6">
          <Skeleton height={35} />
        </td>
        <td className="pr-6">
          <Skeleton height={35} />
        </td>
        <td className="pr-6">
          <Skeleton height={35} />
        </td>
      </tr>
    );

  return (
    <tr
      onClick={() =>
        selectAuthorization({
          ...parsedAuthorization,
          assetDetails: assetDetails,
          approvals: approvedOwners
        })
      }
      className="bg-t-gray-2 text-t-gray-5 rounded cursor-pointer"
    >
      <td className="p-6">{parsedAuthorization.actionTitle}</td>
      <td className="text-t-purple underline">{assetDetails.name}</td>
      <td className="">
        <p className="">{parsedAuthorization.initiator}</p>
      </td>
      <td className="px-6">
        <span className="text-t-purple p-2 px-4 rounded bg-t-purple/20 flex gap-[9px] items-center">
          <TeamIcon />
          {approvedOwners.length}/{parsedAuthorization.confirmationsRequired}
          <Caret />
        </span>
      </td>
    </tr>
  );
};

export { AuthorizationCard };
