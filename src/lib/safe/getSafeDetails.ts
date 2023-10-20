import { Address } from "viem"
import { getSafe } from "./safeSdk";
import { getTeamMembers } from "../taas-api/team/getMembers";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";

const getSafeDetails = async (safeAddress: Address) => {
  //Retrieve the safe SDK for the safeAddress using the currenlty logged in user as a signer
  const safe = await getSafe(safeAddress);

  const currentUser = await getSession();

  if (!currentUser) throw new Error("No auth session");

  const teamMembers = await getTeamMembers(currentUser.user, 'sample-team-id');

  //retrieve the owners of the safe address passed in
  const owners = await safe.getOwners();

  return {
    //return any address that is in the teamMembers array and ia also an owner
    signers: teamMembers.filter((teamMemberAccount) => owners.includes(teamMemberAccount.walletAddress))
  }
}

export { getSafeDetails }