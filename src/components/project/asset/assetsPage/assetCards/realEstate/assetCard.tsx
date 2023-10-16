import { FC } from "react";
import Image from "next/image";
import { MapMarker, PriceTag } from "@/assets/icon";

interface RealEstateAssetCardProps {
  asset: {
    name: string;
    location: string;
    tokenPrice: number;
    displayImage: string;
  };
}

const RealEstateAssetCard: FC<RealEstateAssetCardProps> = ({ asset }) => {
  return (
    <div className="rounded-[4.404px] bg-t-gray-2">
      <div className="relative w-full h-[160px]">
        <Image src={asset.displayImage} alt={asset.name} fill className="object-cover rounded-t-[4.404px]" />
      </div>
      <div className="px-5 pt-3 pb-[27px]">
        <h3 className="text-t-black text-lg truncate font-normal">{asset.name}</h3>
        <p className="flex items-center gap-2 mt-2.5">
          <MapMarker /> <span className="text-t-gray-3">{asset.location}</span>
        </p>
        <p className="flex items-center gap-2 mt-2">
          <PriceTag /> <span className="text-t-gray-3">{asset.tokenPrice.toFixed(2)} USD</span>
        </p>
      </div>
    </div>
  );
};

export { RealEstateAssetCard };
