import { getViemChain } from "@/utils/web3/connection/viemChain";
import { Bundler } from "@biconomy/bundler";
import { DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account";

//Get a chain Id based on the current environment
const chainId = getViemChain().id;

const BUNDLER_URL = `https://bundler.biconomy.io/api/v2/${chainId}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`;

let bundler: Bundler | undefined;

const getBundler = () => {
  if (bundler) return bundler;

  //Creatin a bundler instance if it does not already exist
  bundler = new Bundler({
    bundlerUrl: BUNDLER_URL,
    chainId,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  });

  return bundler;
};

export { getBundler };
