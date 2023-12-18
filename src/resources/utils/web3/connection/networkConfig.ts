import { Address } from "viem";
import { WEB3_ENVIRONMENT, Web3Environment } from "../environment";

type NetworkConfigDictionary = {
  [key in Web3Environment]: {
    rpcUrl: string;
    chainId: number;
    safeService: string;
    explorerUrl: `https://${string}`;
  };
};

const networkConfig: NetworkConfigDictionary = {
  testnet: {
    rpcUrl: "https://rpc.ankr.com/polygon_mumbai",
    chainId: 80001,
    safeService: "https://safe-transaction-polygon.safe.global/",
    explorerUrl: "https://mumbai.polygonscan.com",
  },
  mainnet: {
    rpcUrl: "https://polygon-mainnet.g.alchemy.com/v2/zHEgzvGizW0dHlGJ7J6ZP477wnNlepoF",
    chainId: 137,
    safeService: "https://safe-transaction-polygon.safe.global/",
    explorerUrl: "https://polygonscan.com",
  },
};

const getNetworkConfig = () => {
  return networkConfig[WEB3_ENVIRONMENT];
};
const getSafeServiceUrl = () => {
  return networkConfig[WEB3_ENVIRONMENT].safeService;
};
const getTransactionExplorerUrl = (txHash: string): `https://${string}` => {
  const explorerUrl = networkConfig[WEB3_ENVIRONMENT].explorerUrl;

  return `${explorerUrl}/tx/${txHash}`;
};
const getAddressExplorerUrl = (address: Address): `https://${string}` => {
  const explorerUrl = networkConfig[WEB3_ENVIRONMENT].explorerUrl;

  return `${explorerUrl}/address/${address}`;
};


export { getNetworkConfig, getSafeServiceUrl, getTransactionExplorerUrl, getAddressExplorerUrl };
