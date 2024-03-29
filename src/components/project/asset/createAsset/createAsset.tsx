import { FC } from 'react';
import { CreateRealEstateAsset } from './createRealEstateAsset';
import { Address } from 'viem';

interface CreateAssetProps {
  assetType: AssetType;
  projectId: string;
  projectTokenFactory: Address;
  projectName: string;
}

const CreateAsset: FC<CreateAssetProps> = ({
  assetType,
  projectId,
  projectTokenFactory,
  projectName,
}) => {
  if (assetType === 'real estate')
    return (
      <CreateRealEstateAsset
        projectId={projectId}
        projectTokenFactory={projectTokenFactory}
        projectName={projectName}
      />
    );
};

export { CreateAsset };
