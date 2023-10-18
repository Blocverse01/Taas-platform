import { getXataClient } from "@/xata";
import { getSession } from "next-auth/react";

export const xata = getXataClient();
export const userRepository = xata.db.User;
export const projectRepository = xata.db.Project;
export const projectTeamRepository = xata.db.ProjectTeamMembers;
export const currentUser = async () => await getSession();