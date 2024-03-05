import {
  deactivateMemberRolePayload,
  updateMemberRolePayload,
} from "./teamTypes";
import {
  projectRepository,
  projectTeamRepository,
} from "@/resources/constants";
import { getConcatenatedId } from "@/resources/utils/helperfunctions";
import type { Session } from "next-auth";
import { storeProjectActivityLogItem } from "../activityLog/createActivityLog";
import { ActivityLogCategory, ActivityLogProjectSubCategory } from "../activityLog/types";
import { createActivityLogTitle } from "../../../browser/taas-web/activityLog/utils";

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

    if (project.owner?.id != currentUser.user.id) {
      throw new Error("Only the project owner can update team member role");
    }

    const projectTeamId = getConcatenatedId(
      project.id,
      payload.teamMemberUserId
    );

    const existingProjectTeamMember = await projectTeamRepository()
      .filter({ id: projectTeamId, isActive: true })
      .getFirst();

    if (!existingProjectTeamMember) {
      throw new Error("User is not a current team member");
    }

    existingProjectTeamMember.update({ roleId: +payload.newRole });

    await storeProjectActivityLogItem(payload.projectId, {
      title: createActivityLogTitle(ActivityLogProjectSubCategory["updateTeamMember"], ActivityLogCategory["project"], project.name),
      category: ActivityLogCategory["project"],
      subCategory: ActivityLogProjectSubCategory["updateTeamMember"],
      actor: currentUser.user.walletAddress,
      ctaLink: `/dashboard/projects/${payload.projectId}/team`,
      ctaText: 'View Team Members'
    });

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

    if (project.owner?.id != currentUser.user.id) {
      throw new Error("Only the project owner can update team member role");
    }

    const projectTeamId = getConcatenatedId(
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

    await storeProjectActivityLogItem(payload.projectId, {
      title: createActivityLogTitle(ActivityLogProjectSubCategory["removeTeamMember"], ActivityLogCategory["project"], project.name),
      category: ActivityLogCategory["project"],
      subCategory: ActivityLogProjectSubCategory["removeTeamMember"],
      actor: currentUser.user.walletAddress,
      ctaLink: `/dashboard/projects/${payload.projectId}/team`,
      ctaText: 'View Team Members'
    });

  } catch (error: any) {
    throw error;
  }
};
