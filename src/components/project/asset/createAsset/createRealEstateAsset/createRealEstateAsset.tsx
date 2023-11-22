import { FC } from 'react';
import { CreateRealEstateAssetForm } from './form';
import { Address } from 'viem';
import { tokenizeAsset } from '@/lib/taas-api/tokenFactory/tokenizeAsset';
import { useRouter } from 'next/router';
import { storeProjectAssetFormData } from '@/utils/assetIntegrations';
import { useLocalStorage } from 'usehooks-ts';
import { getConcatenatedId } from '@/utils/helperfunctions';

interface CreateRealEstateAssetProps {
  projectId: string;
  projectTokenFactory: Address;
}

interface TokenOptions {
  tokenTicker: string;
  pricePerToken: number;
  propertyName: string;
}

interface UnStoredTokenization {
  id: string;
  tokenAddress: Address;
  txHash: Address;
}

const CreateRealEstateAsset: FC<CreateRealEstateAssetProps> = ({
  projectTokenFactory,
  projectId,
}) => {
  const router = useRouter();

  const [unStoredTokenization, setUnStoredTokenization] = useLocalStorage<
    UnStoredTokenization | undefined
  >('unStoredTokenization', undefined);

  function getUnStoredTokenization(tokenOptions: TokenOptions) {
    if (!unStoredTokenization) return undefined;

    const { tokenTicker, pricePerToken, propertyName } = tokenOptions;

    // form ID using key tokenization args
    const id = getConcatenatedId(
      projectTokenFactory,
      tokenTicker,
      pricePerToken.toString(),
      propertyName
    );
    if (unStoredTokenization.id !== id) return undefined;

    return unStoredTokenization;
  }

  async function handleAssetTokenization(tokenOptions: TokenOptions) {
    const { tokenTicker, pricePerToken, propertyName } = tokenOptions;

    const { tokenAddress, txHash } = await tokenizeAsset(
      projectTokenFactory,
      tokenTicker,
      pricePerToken,
      propertyName
    );

    setUnStoredTokenization({
      tokenAddress,
      txHash,
      id: getConcatenatedId(
        projectTokenFactory,
        tokenTicker,
        pricePerToken.toString(),
        propertyName
      ),
    });

    return { txHash, tokenAddress };
  }

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

          const tokenOptions = { tokenTicker, pricePerToken, propertyName };

          const { tokenAddress, txHash } =
            getUnStoredTokenization(tokenOptions) ?? (await handleAssetTokenization(tokenOptions));

          await storeProjectAssetFormData(projectId, tokenAddress as Address, {
            ...values,
            documents: values.documents,
          });

          setUnStoredTokenization(undefined);

          router.push(assetsPageLink);
        }}
        backLink={assetsPageLink}
      />
    </section>
  );
};

export { CreateRealEstateAsset };
