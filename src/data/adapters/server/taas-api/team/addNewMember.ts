import { createUser } from "../user";
import { createProjectTeammate } from "../project/addProjectTeam";
import MailService from "@/resources/utils/email";
import { getAddTeamMemberMailOption } from "@/resources/utils/email/helpers";
import {
  projectRepository,
  projectTeamRepository,
  userRepository,
} from "@/resources/constants";
import { AddNewMemberPayload } from "./teamTypes";
import { getConcatenatedId } from "@/resources/utils/helperfunctions";
import type { Session } from "next-auth";

export const addNewTeamMember = async (
  currentUser: Session,
  payload: Omit<AddNewMemberPayload, 'projectName'>
) => {
  const project = await projectRepository()
    .filter({
      id: payload.projectId,
    })
    .getFirstOrThrow();

  if (project.owner?.id != currentUser.user.id) {
    throw new Error("Only the project owner can add team mates");
  }

  let user = await userRepository().filter({ email: payload.email }).getFirst();

  if (!user) {
    user = await createUser({
      email: payload.email.toLowerCase(),
      walletAddress: "",
    });
  }

  const projectTeamMemberId = getConcatenatedId(
    payload.projectId,
    user.id
  );

  const existingTeamMember = await projectTeamRepository()
    .filter({ id: projectTeamMemberId })
    .getFirst();

  if (existingTeamMember?.isActive) {
    throw new Error("This user is already an active team member");
  }

  if (!existingTeamMember) {
    await createProjectTeammate({
      projectId: payload.projectId,
      projectName: project.name,
      userId: user.id,
      role: +payload.role,
      isActive: true,
      name: payload.name
    });
  }

  const mailOptions = getAddTeamMemberMailOption({
    firstname: payload.name,
    senderEmail: currentUser.user.email,
    link: process.env.HOST_SITE as string,
    email: payload.email,
  });

  (await MailService.getTransporter()).sendMail(mailOptions, (error) => {
    if (error) {
      throw new Error("An Error occurred\nNo email sent!");
    }
  });
};
