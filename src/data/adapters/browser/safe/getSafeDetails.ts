import { Address } from "viem";
import { validateSignatory } from "./validateSafeSigner";

export const getSafeOwnersWhoHaveApproved = async (transactionHash: Address, safeAddress: Address): Promise<string[]> => {

  const { safe } = await validateSignatory(safeAddress);

  return await safe.getOwnersWhoApprovedTx(transactionHash);
}

export const getSafeThreshold = async (safeAddress: Address): Promise<number> => {

  const { safe } = await validateSignatory(safeAddress);

  return await safe.getThreshold();
}

