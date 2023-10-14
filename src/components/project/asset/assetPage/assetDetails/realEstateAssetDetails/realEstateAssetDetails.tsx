import { MapMarker } from "@/assets/icon";
import { FC } from "react";

interface RealEstateAssetDetailsProps {
  asset: {
    name: string;
    location: string;
    description: string;
    size: number;
    valuation: number;
  };
}

const RealEstateAssetDetails: FC<RealEstateAssetDetailsProps> = ({ asset }) => {
  return (
    <section>
      <section className="mb-10">
        <h3 className="text-[32px] font-medium text-t-black mb-2">{asset.name}</h3>
        <p className="flex items-center gap-1.5">
          <span className="text-t-black/50">{asset.location}</span> <MapMarker />
        </p>
      </section>
      <section className="bg-t-gray-2 p-6 rounded-xl">
        <div className="items-center flex gap-x-[132px] justify-between">
          <div className="flex gap-x-[96px] justify-between">
            <section className="flex flex-col gap-3">
              <h3 className="text-base text-t-black">Property Description</h3>
              <p className="text-sm text-t-gray-4 max-w-[321px]">{asset.description}</p>
            </section>
            <section className="flex flex-col gap-3">
              <h3 className="text-base text-t-black">Property Size</h3>
              <p className="text-sm text-t-gray-4 max-w-[321px]">
                {asset.size} m<sup>2</sup>
              </p>
            </section>
            <section className="flex flex-col gap-3">
              <h3 className="text-base text-t-black">Property Valuation</h3>
              <p className="text-sm text-t-gray-4 max-w-[321px]">{"$" + asset.valuation}</p>
            </section>
          </div>
          <button className="bg-t-purple py-[18px] px-[51px] text-white rounded">Edit Details</button>
        </div>
      </section>
    </section>
  );
};

export { RealEstateAssetDetails };
