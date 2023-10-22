import { getConcatenatedId } from "@/utils/helperfunctions";
import { projectTeamRepository } from "@/utils/constants";

type CreateProjectTeammatePayload = {
    projectId: string;
    userId: string;
    role: number,
    isActive: boolean
}

const createProjectTeammate = async (payload: CreateProjectTeammatePayload) => {

    const projectTeamMemberId = getConcatenatedId(payload.projectId, payload.userId);

    return await projectTeamRepository().create(projectTeamMemberId, {
        project: payload.projectId,
        user: payload.userId,
        roleId: payload.role,
        isActive: payload.isActive
    });
};

export { createProjectTeammate }