import {
  deactivateMemberRolePayload,
  updateMemberRolePayload,
} from "./teamTypes";
import {
  projectRepository,
  projectTeamRepository,
} from "@/utils/constants";
import { getProjectTeamMemberId } from "@/utils/helperfunctions";
import { Session } from "next-auth";

export const updateTeamMemberRole = async (
  currentUser: Session,
  payload: updateMemberRolePayload
) => {
  try {
    const project = await projectRepository()
      .filter({
        id: payload.projectId,
      })
      .getFirstOrThrow();

    if (project.owner?.id != currentUser.user?.id) {
      throw new Error("Only the project owner can update team member role");
    }

    const projectTeamId = getProjectTeamMemberId(
      project.id,
      payload.teamMemberUserId
    );

    const existingProjectTeamMember = await projectTeamRepository()
      .filter({ id: projectTeamId, isActive: true })
      .getFirst();

    if (!existingProjectTeamMember) {
      throw new Error("User is not a current team member");
    }

    existingProjectTeamMember.update({ roleId: payload.newRole });
  } catch (error: any) {
    throw error;
  }
};

export const removeTeamMember = async (
  currentUser: Session,
  payload: deactivateMemberRolePayload
) => {
  try {
    const project = await projectRepository()
      .filter({
        id: payload.projectId,
      })
      .getFirstOrThrow();

    if (project.owner?.id != currentUser.user?.id) {
      throw new Error("Only the project owner can update team member role");
    }

    const projectTeamId = getProjectTeamMemberId(
      project.id,
      payload.teamMemberUserId
    );

    const existingProjectTeamMember = await projectTeamRepository()
      .filter({ id: projectTeamId, isActive: true })
      .getFirst();

    if (!existingProjectTeamMember) {
      throw new Error("User is not a current team member");
    }

    existingProjectTeamMember.update({ isActive: false });
  } catch (error: any) {
    throw error;
  }
};
