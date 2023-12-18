import { HttpError } from "@/resources/errors";
import { BAD_REQUEST, NOT_FOUND, apiKeyRepository } from "@/resources/constants";
import type { Session } from "next-auth";
import { storeProjectActivityLogItem } from "../activityLog/createActivityLog";
import { createActivityLogTitle } from "../../../browser/taas-web/activityLog/utils";
import { ActivityLogCategory, ActivityLogProjectSubCategory } from "../activityLog/types";


export const deleteUserApiKey = async (currentUser: Session["user"], apiKeyId: string) => {
    const [trimmedUserId, trimmedApiKeyId] = [currentUser.id.trim(), apiKeyId.trim()];

    if (!trimmedUserId || !trimmedApiKeyId) {
        throw new HttpError(BAD_REQUEST, "Args cannot be empty string");
    }

    const existingApiKey = await apiKeyRepository().filter({
        "user.id": trimmedUserId,
        "id": trimmedApiKeyId
    }).select(["project.name", "user.walletAddress"]).getFirst();

    if (!existingApiKey || !existingApiKey.project) {
        throw new HttpError(NOT_FOUND, "API key not found")
    }

    await existingApiKey.delete();

    await storeProjectActivityLogItem(existingApiKey.project.id as string, {
        title: createActivityLogTitle(ActivityLogProjectSubCategory["deleteKey"], ActivityLogCategory["project"], existingApiKey.project.name),
        category: ActivityLogCategory["project"],
        subCategory: ActivityLogProjectSubCategory["deleteKey"],
        actor: existingApiKey.user?.walletAddress ?? trimmedUserId
    });
}