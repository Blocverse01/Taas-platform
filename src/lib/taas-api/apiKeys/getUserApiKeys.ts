import type { Session } from "next-auth";
import { ReturnedApiKey } from "./types";
import { HttpError } from "@/lib/errors";
import { BAD_REQUEST, apiKeyRepository } from "@/utils/constants";

export const getUserApiKeys = async (currentUser: Session["user"]): Promise<Array<ReturnedApiKey>> => {
    if (!currentUser.id.trim()) {
        throw new HttpError(BAD_REQUEST, "Args cannot be empty string");
    }

    const apiKeys = await apiKeyRepository().filter("user.id", currentUser.id).select(["id", "xata.createdAt", "project.name", "project.id"]).getAll();

    return apiKeys.map((apiKey) => ({
        id: apiKey.id,
        createdAt: apiKey.xata.createdAt.toUTCString(),
        project: {
            name: apiKey.project!.name,
            id: apiKey.project!.id
        }
    }))
}