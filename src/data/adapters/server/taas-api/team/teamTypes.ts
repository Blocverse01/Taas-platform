
export type AddNewMemberPayload = {
    projectId: string,    
    name: string,
    email: string,
    role: string
}

export type updateMemberRolePayload = {
    projectId: string,
    teamMemberUserId: string,    
    newRole: string
}

export type deactivateMemberRolePayload = {
    projectId: string,
    teamMemberUserId: string,    
}