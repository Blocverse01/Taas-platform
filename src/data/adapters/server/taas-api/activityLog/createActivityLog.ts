import { activityLogRepository, projectRepository } from "@/resources/constants";
import { ActivityLogItem } from "./types";
import { arrayOfActivityLogsSchema } from "@/data/schema/activityLog";

export async function storeProjectActivityLogItem(projectId: string, logItem: ActivityLogItem) {

    const project = await projectRepository().read(projectId);

    if (!project) {
        throw new Error("Invalid project Id");
    }

    return await activityLogRepository().create({
        ...logItem,
        project: project.id,
    });
}

export async function getProjectActivityLog(projectId: string) {
    const logs = await activityLogRepository().filter("project.id", projectId).sort("xata.createdAt", "desc").getAll();

    const formattedActivityLog = logs.map((item) => ({
        ...item,
        createdAt: item.xata.createdAt
    }));

    return await arrayOfActivityLogsSchema.validate(formattedActivityLog);
}