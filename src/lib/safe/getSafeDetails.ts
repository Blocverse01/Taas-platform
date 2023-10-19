import { Address } from "viem"
import { getTeamMembers } from "../taas-api/team/getMembers";
import { SafeTransaction } from "@safe-global/safe-core-sdk-types";
import { validateSignatory } from "./validateSafeSigner";

export const getSafeDetails = async (safeAddress: Address) => {

  const { currentUser, safe } = await validateSignatory(safeAddress);

  const teamMembers = await getTeamMembers(currentUser, 'sample-team-id');

  const owners = await safe.getOwners();

  return {
    signers: teamMembers.filter((teamMemberAccount) => owners.includes(teamMemberAccount.walletAddress))
  }
}

export const getSafeOwnersWhoHaveApproved = async (transaction: SafeTransaction, safeAddress: Address): Promise<string[]> => {

  const { safe } = await validateSignatory(safeAddress);

  const txHash = await safe.getTransactionHash(transaction);

  return await safe.getOwnersWhoApprovedTx(txHash);
}

export const getSafeThreshold = async (safeAddress: Address): Promise<number> => {

  const { safe } = await validateSignatory(safeAddress);

  return await safe.getThreshold();
}

