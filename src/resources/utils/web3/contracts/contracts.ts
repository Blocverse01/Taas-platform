import { Address } from "viem";
import { WEB3_ENVIRONMENT, Web3Environment } from "../environment";

type ContractIDs = "PLATFORM_ENTRY" | "ASSET_TOKEN" | "ASSET_TOKEN_FACTORY";

type ContractsDictionary = {
  [key in Web3Environment]: {
    [key in ContractIDs]?: Address;
  };
};

const contracts: ContractsDictionary = {
  testnet: {
    PLATFORM_ENTRY: "0xb3972efFF9F4D805E78B440520ff003f537238b8",
    ASSET_TOKEN: "0xAA2cBD04163a5396d185B6Bb736fE387BD13B6f4",
    ASSET_TOKEN_FACTORY: "0x38866775961A11529a0541D34A8fab0D399A50d3"
  },
  mainnet: {
    PLATFORM_ENTRY: "0x59f2f026473aBc82a9e61286ca053175681C25E6"
  },
};

const getContractAddress = (contractId: ContractIDs) => {
  const contractAddress = contracts[WEB3_ENVIRONMENT][contractId];
  if (!contractAddress)
    throw new Error(`${contractId} is not configured on ${WEB3_ENVIRONMENT}`);
  return contractAddress;
};

export { getContractAddress };
