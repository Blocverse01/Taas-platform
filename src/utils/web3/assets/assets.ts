import { Address } from "viem";
import { getPaymentMethods } from "../payment";
import maticLogo from "@/assets/maticLogo.svg";

type SupportedAssetSymbol = "USDT" | "USDC" | "EUROC" | "MATIC";

export interface SupportedAsset {
  id: number;
  symbol: SupportedAssetSymbol;
  logo: any;
  tokenAddress?: Address;
}

const paymentMethods = getPaymentMethods();

const assets: Array<SupportedAsset> = [
  ...paymentMethods,
  {
    id: paymentMethods[paymentMethods.length - 1].id + 1,
    symbol: "MATIC",
    logo: maticLogo.src,
  },
];

const getAssets = () => assets;
const getAsset = (assetId: number) => {
  const asset = assets.find((asst) => asst.id === assetId);

  if (!asset) throw new Error("Asset not found");

  return asset;
};

const getAssetTokenAddressForPriceAPI = (
  assetSymbol: SupportedAssetSymbol
): Address => {
  // TODO: change to address for WMATIC
  if (assetSymbol === "MATIC") return "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"; // Wrapped ETH on OP

  const asset = assets.find((asst) => asst.symbol === assetSymbol);
  if (!asset) throw new Error("Asset not found");
  if (!asset.tokenAddress)
    throw new Error(`No token address configured for ${assetSymbol}`);

  return asset.tokenAddress;
};

export { getAssets, getAsset, getAssetTokenAddressForPriceAPI };
