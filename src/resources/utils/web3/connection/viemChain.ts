import { Chain } from "viem";
import { WEB3_ENVIRONMENT, Web3Environment } from "../environment";
import { polygon, polygonMumbai } from "viem/chains";

type ChainDictionary = {
  [key in Web3Environment]: Chain
}

const chain: ChainDictionary = {
  testnet: polygonMumbai,
  mainnet: polygon
}

const getViemChain = () => {
  return chain[WEB3_ENVIRONMENT];
}

export { getViemChain }