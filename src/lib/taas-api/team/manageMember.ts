import { getSession } from "next-auth/react";
import { deactivateMemberRolePayload, updateMemberRolePayload } from "./teamTypes";
import { projectRepository, projectTeamRepository } from "@/utils/constants";
import { getProjectTeamMemberId } from "@/utils/helperfunctions";

export const updateTeamMemberRole = async (payload: updateMemberRolePayload) => {

    try {
        const currentUser = await getSession();

        if (!currentUser) throw new Error('Unauthorized action');

        const project = await projectRepository.filter({
            id: payload.projectId
        }).getFirstOrThrow();

        if (project.owner?.id != currentUser.user?.email) {
            throw new Error("Only the project owner can update team member role")
        }

        const projectTeamId = getProjectTeamMemberId(project.id, payload.teamMemberUserId);

        const exisitingProjectTeamMember = await projectTeamRepository.filter({ id: projectTeamId, isActive: true }).getFirst();

        if (!exisitingProjectTeamMember) {
            throw new Error("User is not a current team member")
        }

        exisitingProjectTeamMember.update({ roleId: payload.newRole });
    } catch (error: any) {
        throw error;
    }
}

export const removeTeamMember = async (payload: deactivateMemberRolePayload) => {

    try {
        const currentUser = await getSession();

        if (!currentUser) throw new Error('Unauthorized action');

        const project = await projectRepository.filter({
            id: payload.projectId
        }).getFirstOrThrow();

        if (project.owner?.id != currentUser.user?.email) {
            throw new Error("Only the project owner can update team member role")
        }

        const projectTeamId = getProjectTeamMemberId(project.id, payload.teamMemberUserId);

        const exisitingProjectTeamMember = await projectTeamRepository.filter({ id: projectTeamId, isActive: true }).getFirst();

        if (!exisitingProjectTeamMember) {
            throw new Error("User is not a current team member")
        }

        exisitingProjectTeamMember.update({ isActive: false });
    } catch (error: any) {
        throw error;
    }
}