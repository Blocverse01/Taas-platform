import { getXataClient } from "@/xata";

export const userRepository = () => getXataClient().db.User;
export const projectRepository = () => getXataClient().db.Project;
export const projectTeamRepository = () =>
  getXataClient().db.ProjectTeamMembers;
