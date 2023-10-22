import { Magic } from "magic-sdk";
import { MissingEnvVariableError, MisuseError } from "../../errors";
import { getNetworkConfig } from "@/utils/web3/connection";

let instance: Magic | undefined = undefined;

export const getMagicClient = () => {
  const magicPubKey = process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY;
  if (magicPubKey === undefined || magicPubKey === "") {
    throw new MissingEnvVariableError("NEXT_PUBLIC_MAGIC_PUBLIC_KEY");
  }

  if (typeof window === "undefined") {
    throw new MisuseError(
      "Magic web client should be used in non-SSR environments"
    );
  }

  if (!instance) {
    const networkConfig = getNetworkConfig();
    // Todo: setup chain config
    instance = new Magic(magicPubKey, {
      network: networkConfig
    });
  }

  return instance;
};
