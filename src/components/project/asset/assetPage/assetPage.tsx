import { ComponentProps, FC } from "react";
import { RealEstateAssetDetails } from "./assetDetails";
import { DocumentsManagement } from "./documentsManagement";
import { TokenManagement } from "./tokenManagement";
import { DangerZone } from "./dangerZone";
import { createIssueTokenAssetTransaction } from "@/lib/taas-api/token/createIssueTokenTransaction";
import { Address } from "viem";
import { getTokenInformation } from "@/lib/taas-api/token/getTokenInformation";

type TokenManagementProps = ComponentProps<typeof TokenManagement>;
type DocumentsManagementProps = ComponentProps<typeof DocumentsManagement>;

interface TokenizedAsset {
  id: string;
  tokenAddress: TokenManagementProps["tokenAddress"];
  tokenPrice: TokenManagementProps["tokenPrice"];
  documents: DocumentsManagementProps["documents"];
}

type RealEstateAsset = TokenizedAsset & ComponentProps<typeof RealEstateAssetDetails>["asset"];

interface AssetPageProps {
  assetType: AssetType;
  asset: RealEstateAsset; // Todo: add other possible asset types
  projectSafeWallet: Address;
  projectTokenFactory: Address;
}

function renderAssetDetails(assetType: AssetType, asset: RealEstateAsset) {
  if (assetType === "real estate") {
    return <RealEstateAssetDetails asset={asset} />;
  }
  return <></>;
}

const AssetPage: FC<AssetPageProps> = ({ assetType, asset, projectSafeWallet, projectTokenFactory }) => {
  return (
    <section className="flex-col flex gap-10">
      {renderAssetDetails(assetType, asset)}
      <DocumentsManagement documents={asset.documents} />
      <TokenManagement
        tokenAddress={asset.tokenAddress}
        tokenPrice={asset.tokenPrice}
        getTokenInformation={async (tokenAddress) => {
          const { totalSupply } = await getTokenInformation(tokenAddress);
          return {
            totalSupply,
            assetHoldersCount: 5  // Todo: add functionality for asset holders count
          }
        }
        }
        issueToken={async (tokenAddress, destinationWallet, amount) => {
          const { } = await createIssueTokenAssetTransaction(projectSafeWallet, {
            destinationWallet,
            amount,
            tokenAddress,
            tokenFactory: projectTokenFactory
          });
        }} // Todo: add real token issue functionality
      />
      <DangerZone
        delistAsset={(assetId) => Promise.resolve()} // Todo: add real delist asset functionality
        assetId={asset.id}
        assetType={assetType}
        tokenAddress={asset.tokenAddress}
        disableToken={(tokenAddress) => Promise.resolve()} // Todo: add real disable token functionality
      />
    </section>
  );
};

export { AssetPage };
