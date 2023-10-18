import { projectRepository, projectTeamRepository, xata } from "@/utils/constants";

type CreateProjectTeammatePayload = {
    projectId: string;
    email: string;
    role: number,
    isActive: boolean
}

const createProjectTeamate = async (payload: CreateProjectTeammatePayload) => {
    return await projectTeamRepository.create(`${payload.projectId}-${payload.email}`,{
        projectId: payload.projectId,
        userId: payload.email,
        roleId : payload.role,
        isActive: payload.isActive
    });
};

export { createProjectTeamate }