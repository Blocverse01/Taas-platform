import { Address } from "viem";
import { getSafeFactory } from "../safe";
import Safe, { SafeAccountConfig } from '@safe-global/protocol-kit'

const deploySafe = async (owners: Address[], threshold: number) => {
  if (threshold > owners.length) throw new Error(`Max threshold should be less than or equal to ${owners.length}`);

  const safeAccountConfig: SafeAccountConfig = {
    owners,
    threshold
  }
  const safeFactory = await getSafeFactory();
  const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig })

  return (await safeSdk.getAddress()) as Address;
}

export { deploySafe }