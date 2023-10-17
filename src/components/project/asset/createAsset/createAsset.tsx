import { FC } from "react";
import { CreateRealEstateAsset } from "./createRealEstateAsset";
import { Address } from "viem";

interface CreateAssetProps {
  assetType: AssetType;
  projectId: string;
  projectTokenFactory: Address;
}

const CreateAsset: FC<CreateAssetProps> = ({
  assetType,
  projectId,
  projectTokenFactory,
}) => {
  if (assetType === "real estate")
    return (
      <CreateRealEstateAsset
        projectId={projectId}
        projectTokenFactory={projectTokenFactory}
      />
    );
};

export { CreateAsset };
