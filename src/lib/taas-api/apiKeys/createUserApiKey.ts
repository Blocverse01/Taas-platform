import { HttpError, MissingEnvVariableError } from "@/lib/errors";
import { BAD_REQUEST, apiKeyRepository } from "@/utils/constants";
import type { Session } from "next-auth";
import { getUserProject } from "../project/getUserProject";
import { randomBytes } from "crypto";
import bcrypt from "bcrypt";

const API_KEY_LENGTH = process.env.API_KEY_LENGTH;
const API_KEY_SALT = process.env.API_KEY_SALT;

function generateApiKey() {
    if (!API_KEY_LENGTH) throw new MissingEnvVariableError('API_KEY_LENGTH');
    return randomBytes(+API_KEY_LENGTH).toString("base64");
}

function hashApiKey(apiKey: string) {
    if (!API_KEY_SALT) throw new MissingEnvVariableError('API_KEY_LENGTH');
    return bcrypt.hashSync(apiKey, API_KEY_SALT);
}

export const createUserApiKey = async (currentUser: Session["user"], projectId: string) => {
    const [trimmedUserId, trimmedProjectId] = [currentUser.id.trim(), projectId.trim()];

    if (!trimmedUserId || !trimmedProjectId) {
        throw new HttpError(BAD_REQUEST, "Args cannot be empty string");
    }

    // check that project exists and user owns project
    const validProject = await getUserProject(currentUser, trimmedProjectId, true);

    const existingApiKey = await apiKeyRepository().filter({
        "user.id": trimmedUserId,
        "project.id": validProject.id,
    }).getFirst();

    if (existingApiKey) {
        await existingApiKey.delete();
    }

    const newApiKey = generateApiKey();

    await apiKeyRepository().create({
        apiKey: hashApiKey(newApiKey),
        user: trimmedUserId,
        project: trimmedProjectId,
    });

    return newApiKey;
}