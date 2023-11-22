import { activityLogRepository, projectRepository } from "@/utils/constants";
import { ActivityLogRecord } from "@/xata";
import { JSONData } from "@xata.io/client";
import { ActivityLogItem } from "./types";

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

    return logs.map((log) => log.toSerializable() as Required<JSONData<ActivityLogRecord>>);
}