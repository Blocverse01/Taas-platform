import { ComponentProps, FC } from "react";
import { RealEstateAssetCard } from "./assetCards";
import { AssetsList } from "./assetsList";
import { Plus } from "@/assets/icon";

type RealEstateAsset = ComponentProps<typeof RealEstateAssetCard>["asset"] & {
  id: string;
};
type AssetType = "real estate";
type Assets = Array<RealEstateAsset>; // Todo: add other possible asset types

interface AssetsPageProps {
  assetType: AssetType;
  assets: Assets;
}

function renderAssetsPage(assetType: AssetType, assets: Assets) {
  if (assetType === "real estate") {
    return <AssetsList<RealEstateAsset> items={assets} renderItem={(item) => <RealEstateAssetCard asset={item} />} />;
  }
  return <></>;
}

const AssetsPage: FC<AssetsPageProps> = ({ assetType, assets }) => {
  return (
    <section>
      <div className="mb-[44px] flex items-center justify-between">
        <h3 className="capitalize bg-t-faded-purple w-fit py-4 px-8 text-t-purple text-sm rounded bg-opacity-70">
          {assetType}
        </h3>
        <button className="bg-t-purple py-[18px] px-[19px] rounded text-base text-white flex items-center gap-[9.05px]">
          <Plus />
          <span>Create a New Asset</span>
        </button>
      </div>
      {renderAssetsPage(assetType, assets)}
    </section>
  );
};

export { AssetsPage };
