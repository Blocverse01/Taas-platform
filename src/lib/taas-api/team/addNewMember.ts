import { createUser } from "../user";
import { createProjectTeammate } from "../project/addProjectTeam";
import MailService from "@/utils/email";
import { getAddTeamMemberMailOption } from "@/utils/email/helpers";
import {
  projectRepository,
  projectTeamRepository,
  userRepository,
} from "@/utils/constants";
import { AddNewMemberPayload } from "./teamTypes";
import { getProjectTeamMemberId } from "@/utils/helperfunctions";
import { Session } from "next-auth";

export const addNewTeamMember = async (
  currentUser: Session,
  payload: AddNewMemberPayload
) => {
  const project = await projectRepository()
    .filter({
      id: payload.projectId,
    })
    .getFirstOrThrow();

  if (project.owner?.id != currentUser.user?.email) {
    throw new Error("Only the project owner can add team mates");
  }

  let user = await userRepository().filter({ email: payload.email }).getFirst();

  if (!user) {
    user = await createUser({
      email: payload.email,
      walletAddress: "",
    });
  }

  const projectTeamMemberId = getProjectTeamMemberId(
    payload.projectId,
    user.id
  );

  const existingTeamMember = await projectTeamRepository()
    .filter({ id: projectTeamMemberId })
    .getFirst();

  if (existingTeamMember && existingTeamMember.isActive) {
    throw new Error("This user is already an active team member");
  }

  if (!existingTeamMember) {
    await createProjectTeammate({
      projectId: payload.projectId,
      userId: payload.email,
      role: +payload.role,
      isActive: false,
    });
  }

  const mailOptions = getAddTeamMemberMailOption({
    firstname: payload.name,
    senderEmail: currentUser.user?.email as string,
    link: process.env.HOST_SITE as string,
    email: payload.email,
  });

  (await MailService.getTransporter()).sendMail(mailOptions, async (error) => {
    if (error) {
      throw new Error("An Error occured\nNo email sent!");
    }
  });
};
