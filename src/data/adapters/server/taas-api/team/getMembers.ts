import { HttpError } from "@/resources/errors";
import { BAD_REQUEST, projectTeamRepository } from "@/resources/constants";
import type { Session } from "next-auth";
import { Address } from "viem"

const getTeamMembers = async (currentUser: Session["user"], projectId: string) => {
  if (!currentUser.id.trim() || !projectId.trim()) {
    throw new HttpError(BAD_REQUEST, "Args cannot be empty string");
  }

  const teamMemberships = await projectTeamRepository().filter("project.id", projectId).select(["user.email", "user.walletAddress", "roleId", "isActive", "name", "user.id"]).getAll();

  const teamMembers = teamMemberships.map((membership) => ({
    name: membership.name,
    email: membership.user!.email!,
    walletAddress: membership.user!.walletAddress! as Address,
    role: membership.roleId!,
    isActive: membership.isActive!,
    userId: membership.user!.id
  }));

  return teamMembers;
}

export { getTeamMembers }