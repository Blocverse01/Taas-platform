const updateTeamMemberRole = async (payload: { newRole: number, teamMemberUserId: string, projectId: string }) => {
    const { newRole, teamMemberUserId, projectId } = payload;

    const endpoint = `/api/user/projects/${projectId}/team/update-member-role`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json"
        },
        body: JSON.stringify({
            teamMemberUserId,
            newRole
        })
    });

    if (!response.ok) throw new Error('Invalid response');
}

export { updateTeamMemberRole };