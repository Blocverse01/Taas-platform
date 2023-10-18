import { getProjectTeamId } from "@/utils/helperfunctions";
import { projectRepository, projectTeamRepository, xata } from "@/utils/constants";

type CreateProjectTeammatePayload = {
    projectId: string;
    userId: string;
    role: number,
    isActive: boolean
}

const createProjectTeammate = async (payload: CreateProjectTeammatePayload) => {

    const projectTeamMemberId = getProjectTeamId(payload.projectId, payload.userId);

    return await projectTeamRepository.create(projectTeamMemberId, {
        projectId: payload.projectId,
        userId: payload.userId,
        roleId: payload.role,
        isActive: payload.isActive
    });
};

export { createProjectTeammate }