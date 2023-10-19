import { Address } from "viem";
import { WEB3_ENVIRONMENT, Web3Environment } from "../environment";

type ContractIDs = "PLATFORM_ENTRY";

type ContractsDictionary = {
  [key in Web3Environment]: {
    [key in ContractIDs]?: Address;
  };
};

const contracts: ContractsDictionary = {
  testnet: {
    PLATFORM_ENTRY: "0x44C2cf0B97c5EE08156683aF5509E16d7A68A324",
  },
  mainnet: {},
};

const getContractAddress = (contractId: ContractIDs) => {
  const contractAddress = contracts[WEB3_ENVIRONMENT][contractId];
  if (!contractAddress)
    throw new Error(`$contractId} is not configured on ${WEB3_ENVIRONMENT}`);
  return contractAddress;
};

export { getContractAddress };
