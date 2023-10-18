import { getXataClient } from "@/xata";
import { getServerSession } from "next-auth";

export const userRepository = () => getXataClient().db.User;
export const projectRepository = () => getXataClient().db.Project;
export const projectTeamRepository = () =>
  getXataClient().db.ProjectTeamMembers;
export const getCurrentUser = async () => await getServerSession();
