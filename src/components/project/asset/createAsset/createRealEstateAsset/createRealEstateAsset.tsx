import { FC } from 'react';
import { CreateRealEstateAssetForm } from './form';
import { Address } from 'viem';
import { tokenizeAsset } from '@/data/adapters/browser/taas-web/tokenFactory/tokenizeAsset';
import { useRouter } from 'next/router';
import { storeProjectAssetFormData } from '@/data/adapters/browser/taas-web/token/tokenizedAsset';
import { useLocalStorage } from 'usehooks-ts';
import { getConcatenatedId } from '@/resources/utils/helperfunctions';
import { saveToProjectActivityLog } from '@/data/adapters/browser/taas-web/activityLog';
import { getTransactionExplorerUrl } from '@/resources/utils/web3/connection';
import {
  ActivityLogCategory,
  ActivityLogProjectSubCategory,
} from '@/data/adapters/server/taas-api/activityLog/types';
import { createActivityLogTitle } from '@/data/adapters/browser/taas-web/activityLog/utils';

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

    const { tokenAddress, txHash, actor } = await tokenizeAsset(
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

    await saveToProjectActivityLog(projectId, {
      actor,
      title: createActivityLogTitle(ActivityLogProjectSubCategory['tokenizeAsset'], txHash),
      category: ActivityLogCategory['project'],
      ctaLink: getTransactionExplorerUrl(txHash),
      ctaText: 'View Transaction',
      subCategory: ActivityLogProjectSubCategory['tokenizeAsset'],
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

          await router.push(assetsPageLink);
        }}
        backLink={assetsPageLink}
      />
    </section>
  );
};

export { CreateRealEstateAsset };
