
export const getProjectTeamId = (projectId: string, userId: string) => {
    return `${projectId}-${userId}`
}