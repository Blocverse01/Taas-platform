import { HttpError } from "@/resources/errors";
import { BAD_REQUEST, projectTeamRepository } from "@/resources/constants";
import type { Session } from "next-auth";
import { Address } from "viem"

const getTeamMembers = async (currentUser: Session["user"], projectId: string) => {
  if (!currentUser.id.trim() || !projectId.trim()) {
    throw new HttpError(BAD_REQUEST, "Args cannot be empty string");
  }

  const teamMemberships = await projectTeamRepository().filter("project.id", projectId).select(["user.email", "user.walletAddress", "roleId", "isActive"]).getAll();

  const teamMembers = teamMemberships.map((membership) => ({
    name: "Name cannot be blank", // Todo: figure out how names should be retrieved
    email: membership.user!.email!,
    walletAddress: membership.user!.walletAddress! as Address,
    role: membership.roleId!,
    isActive: membership.isActive!
  }));

  return teamMembers;
}

export { getTeamMembers }