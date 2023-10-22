import { BiconomySmartAccount } from "@biconomy/account";
import { getMagicClient } from "@/lib/magic/clients/web";
import { getViemChain } from "@/utils/web3/connection/viemChain";
import { ethers } from "ethers";
import { getPaymaster } from "./paymaster";
import { getBundler } from "./bundler";

let smartAccount: BiconomySmartAccount | undefined;

const getSmartAccount = async () => {
  if (smartAccount) return smartAccount;

  const magicProvider = getMagicClient().rpcProvider;
  const paymaster = getPaymaster();
  const bundler = getBundler();

  smartAccount = await new BiconomySmartAccount({
    //Use magic to retrieve a signer
    signer: new ethers.providers.Web3Provider(magicProvider as any).getSigner(),
    chainId: getViemChain().id,
    bundler: bundler,
    paymaster: paymaster,
  }).init();

  return smartAccount;
};

export { getSmartAccount };
