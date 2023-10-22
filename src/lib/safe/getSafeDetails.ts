import { Address } from "viem"
import { getTeamMembers } from "../taas-api/team/getMembers";
import { SafeTransaction } from "@safe-global/safe-core-sdk-types";
import { validateSignatory } from "./validateSafeSigner";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";

export const getSafeDetails = async (safeAddress: Address) => {

  const { currentUser, safe } = await validateSignatory(safeAddress);

  const teamMembers = await getTeamMembers(currentUser.user, 'sample-team-id');

  const owners = await safe.getOwners();

  return {
    signers: teamMembers.filter((teamMemberAccount) => owners.includes(teamMemberAccount.walletAddress))
  }
}

export const getSafeOwnersWhoHaveApproved = async (transactionHash: Address, safeAddress: Address): Promise<string[]> => {

  const { safe } = await validateSignatory(safeAddress);

  return await safe.getOwnersWhoApprovedTx(transactionHash);
}

export const getSafeThreshold = async (safeAddress: Address): Promise<number> => {

  const { safe } = await validateSignatory(safeAddress);

  return await safe.getThreshold();
}

