import { FC } from 'react';
import { CreateRealEstateAssetForm } from './form';
import { Address } from 'viem';
import { tokenizeAsset } from '@/lib/taas-api/tokenFactory/tokenizeAsset';
import { useRouter } from 'next/router';
import { storeProjectAssetFormData } from '@/utils/assetIntegrations';

interface CreateRealEstateAssetProps {
  projectId: string;
  projectTokenFactory: Address;
}

const CreateRealEstateAsset: FC<CreateRealEstateAssetProps> = ({
  projectTokenFactory,
  projectId,
}) => {
  const router = useRouter();

  const assetsPageLink = `/dashboard/projects/${projectId}/assets`;

  return (
    <section>
      <div className="mb-8 w-fit mx-auto flex flex-col gap-4">
        <h3 className="text-2xl font-medium text-t-black text-center">Real Estate Tokenization</h3>
        <p className="text-t-black text-base text-center">
          Fill this form to create a new real estate asset.
        </p>
      </div>

      <CreateRealEstateAssetForm
        handleCreateAsset={async (values) => {
          const { tokenTicker, pricePerToken, propertyName } = values;

          const { tokenAddress, txHash } = await tokenizeAsset(
            projectTokenFactory,
            tokenTicker,
            pricePerToken,
            propertyName
          );

          await storeProjectAssetFormData(projectId, tokenAddress as Address, {
            ...values,
            documents: values.documents,
          });
          router.push(assetsPageLink);
        }}
        backLink={assetsPageLink}
      />
    </section>
  );
};

export { CreateRealEstateAsset };
