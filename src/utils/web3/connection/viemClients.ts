import { getMagicClient } from "../../../lib/magic/clients/web";
import { PublicClient, WalletClient, createPublicClient, createWalletClient, custom } from "viem";
import { getViemChain } from "./viemChain";

let publicClientInstance: PublicClient | undefined;
let walletClientInstance: WalletClient | undefined;

const getPublicClient = () => {
  if (publicClientInstance) return publicClientInstance;
  const magic = getMagicClient();

  publicClientInstance = createPublicClient({
    chain: getViemChain(),
    transport: custom(magic.rpcProvider)
  });
  return publicClientInstance;
}

const getWalletClient = () => {
  if (walletClientInstance) return walletClientInstance;
  const magic = getMagicClient();

  walletClientInstance = createWalletClient({
    chain: getViemChain(),
    transport: custom(magic.rpcProvider)
  });
  return walletClientInstance;
}

export { getPublicClient, getWalletClient }