import { FC } from "react";
import Image from "next/image";

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
      <Image
        src={asset.displayImage}
        alt={asset.name}
        height={100}
        width={231}
        className="object-cover"
      />
      <div className="px-5 pt-3 pb-[27px]">
        <h3 className="text-t-black text-lg truncate">{asset.name}</h3>
        <p>
          
        </p>
      </div>
    </div>
  );
};

export { RealEstateAssetCard };
