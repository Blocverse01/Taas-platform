
export const getProjectTeamMemberId = (projectId: string, userId: string) => {
    return `${projectId}-${userId}`
}