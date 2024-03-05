import { BiconomySmartAccountV2 } from "@biconomy/account";
import { getMagicClient } from "@/data/adapters/browser/magic/webClient";
import { ethers } from "ethers";
import { ChainId } from "@biconomy/core-types";

let smartAccount: BiconomySmartAccountV2 | undefined;

/**
 * @deprecated use Alchemy's smart account client instead
 */
const getSmartAccount = async () => {

  if (smartAccount) return smartAccount;

  const magicProvider = getMagicClient().rpcProvider;

  const provider = new ethers.providers.Web3Provider(magicProvider as any);

  const signer = provider.getSigner();

  const biconomySmartAccountConfig = {
    signer: signer,
    chainId: ChainId.POLYGON_MUMBAI,
    biconomyPaymasterApiKey: process.env.NEXT_PUBLIC_PAYMASTER_APIKEY,
    bundlerUrl: "https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
  };

  return smartAccount ??= await BiconomySmartAccountV2.create(biconomySmartAccountConfig);
};

export { getSmartAccount };
