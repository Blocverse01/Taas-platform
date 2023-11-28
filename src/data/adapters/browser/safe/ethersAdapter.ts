import { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import { getMagicClient } from "../magic/webClient";

let ethAdapterInstance: EthersAdapter | undefined;

const getEthersAdapter = () => {
  if (ethAdapterInstance) return ethAdapterInstance;

  //We get the currently logged in user
  const magic = getMagicClient();

  const provider = new ethers.providers.Web3Provider(magic.rpcProvider as any);

  //We retrieve the currently logged in user as a signer
  const signer = provider.getSigner();

  //We create an EthersAdapter that is basically a wrapper around ethers library.
  //In our case any request made from this wrapper is tied to the currently logged in user 
  ethAdapterInstance = new EthersAdapter({
    ethers,
    signerOrProvider: signer,
  });

  return ethAdapterInstance;
};

export { getEthersAdapter };
