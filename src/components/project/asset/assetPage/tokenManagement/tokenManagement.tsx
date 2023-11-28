import { FC } from "react";
import { Address } from "viem";
import useSwr from "swr";
import Skeleton from "react-loading-skeleton";
import { IssueTokenDialog } from "./issueTokenDialog";

interface TokenManagementProps {
  tokenAddress: Address;
  tokenPrice: number;
  getTokenInformation: (tokenAddress: Address) => Promise<{
    totalSupply: number;
    assetHoldersCount: number;
  }>;
  issueToken: (
    tokenAddress: Address,
    destinationWallet: Address,
    amount: number
  ) => Promise<void>;
}

const TokenManagement: FC<TokenManagementProps> = ({
  tokenAddress,
  tokenPrice,
  getTokenInformation,
  issueToken,
}) => {
  const key = `/tokens/${tokenAddress}/information`;
  const { data: tokenInformation, error } = useSwr(key, () =>
    getTokenInformation(tokenAddress)
  );

  const totalSupply = tokenInformation?.totalSupply;
  const assetHoldersCount = tokenInformation?.assetHoldersCount;

  return (
    <section className="bg-t-gray-2 p-6 rounded-xl">
      <section className="max-w-fit space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl text-t-black font-medium">Token Management</h3>
          <IssueTokenDialog
            handleIssueToken={async (destinationAddress, amount) => {
              await issueToken(tokenAddress, destinationAddress, amount);
            }}
          />
        </div>
        <div className="flex gap-16">
          <div className="flex flex-col gap-4">
            <span className="text-t-black text-base">Total Supply</span>
            <span className="text-t-gray-4 text-base">
              {totalSupply === undefined && !error ? <Skeleton /> : totalSupply}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-t-black text-base">
              No. of Wallets Holding Asset
            </span>
            <span className="text-t-gray-4 text-base">
              {assetHoldersCount === undefined && !error ? (
                <Skeleton />
              ) : (
                assetHoldersCount
              )}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-t-black text-base">Price</span>
            <span className="text-t-gray-4 text-base">
              {"$" + `${tokenPrice}`}
            </span>
          </div>
        </div>
        <div>
          {
            // Todo: Request for token transfer designs and implement.
          }
          <button className="underline text-t-purple text-base">
            Transfer Token to Wallet
          </button>
        </div>
      </section>
    </section>
  );
};

export { TokenManagement };
