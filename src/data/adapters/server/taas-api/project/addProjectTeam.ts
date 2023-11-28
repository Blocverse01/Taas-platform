import { getConcatenatedId } from "@/resources/utils/helperfunctions";
import { NOT_FOUND, projectTeamRepository } from "@/resources/constants";
import { storeProjectActivityLogItem } from "../activityLog/createActivityLog";
import { ActivityLogCategory, ActivityLogProjectSubCategory } from "../activityLog/types";
import { createActivityLogTitle } from "../../../browser/taas-web/activityLog/utils";
import { CreateProjectTeammatePayload } from "./types";
import { getUserById } from "../user";
import { HttpError } from "@/resources/errors";

const createProjectTeammate = async (payload: CreateProjectTeammatePayload) => {

    const user = await getUserById(payload.userId);

    if (!user) {
        throw new HttpError(NOT_FOUND, "Invalid User")
    }

    const projectTeamMemberId = getConcatenatedId(payload.projectId, payload.userId);

    const projectTeamMember = await projectTeamRepository().create(projectTeamMemberId, {
        project: payload.projectId,
        user: payload.userId,
        roleId: payload.role,
        isActive: payload.isActive
    });

    await storeProjectActivityLogItem(payload.projectId, {
        title: createActivityLogTitle(ActivityLogProjectSubCategory["addTeamMember"], ActivityLogCategory["project"], payload.projectName),
        category: ActivityLogCategory["project"],
        subCategory: ActivityLogProjectSubCategory["addTeamMember"],
        actor: user.walletAddress
    });

    return projectTeamMember;
};

export { createProjectTeammate }