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
    PLATFORM_ENTRY: "0xf2037D313eDC9238ABa59DAdb16869b93d579173"
    //"0x44C2cf0B97c5EE08156683aF5509E16d7A68A324",
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
