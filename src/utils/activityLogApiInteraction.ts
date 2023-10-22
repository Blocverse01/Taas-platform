import { ActivityLog } from "@/xata";
import { CREATE_ACTIVITY_LOG_ENDPOINT, GET_ACTIVITY_LOG_ENDPOINT } from "./constants";

type ActivityCategory = "asset" | "configuration" | "integration";

type ActivityLogItem = Pick<ActivityLog, "category" | "ctaLink" | "ctaText" | "title"> & {
    category: ActivityCategory;
};

const storeActivityLogItem = async (payload: { projectId: string, logItem: ActivityLogItem }) => {
    try {
        const response = await fetch(CREATE_ACTIVITY_LOG_ENDPOINT, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error("File Upload failed");

        return await response.json();
    } catch (error) {
        throw error;
    }
};

const getActivityLogItem = async (projectId: string) => {

    const queryString = new URLSearchParams({ projectId }).toString();

    try {
        const response = await fetch(`${GET_ACTIVITY_LOG_ENDPOINT}?${queryString}`, {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) throw new Error("File Retrieval failed");

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export { getActivityLogItem, storeActivityLogItem }