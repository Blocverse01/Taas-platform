import { HttpError } from "@/lib/errors";
import { BAD_REQUEST, NOT_FOUND, apiKeyRepository } from "@/utils/constants";
import type { Session } from "next-auth";


export const deleteUserApiKey = async (currentUser: Session["user"], apiKeyId: string) => {
    const [trimmedUserId, trimmedApiKeyId] = [currentUser.id.trim(), apiKeyId.trim()];

    if (!trimmedUserId || !trimmedApiKeyId) {
        throw new HttpError(BAD_REQUEST, "Args cannot be empty string");
    }

    const existingApiKey = await apiKeyRepository().filter({
        "user.id": trimmedUserId,
        "id": trimmedApiKeyId,
    }).getFirst();

    if (!existingApiKey) {
        throw new HttpError(NOT_FOUND, "API key not found")
    }

    await existingApiKey.delete();
}