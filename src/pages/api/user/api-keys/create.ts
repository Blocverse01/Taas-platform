import { NextApiHandler, NextApiResponse } from "next";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "@/resources/constants";
import { validateAuthInApiHandler } from "@/data/adapters/browser/auth";
import { createUserApiKey } from "@/data/adapters/server/taas-api/apiKeys/createUserApiKey";
import { HttpError } from "@/resources/errors";

type ApiResponse = {
    message?: string;
    data?: Awaited<ReturnType<typeof createUserApiKey>>;
};

const handler: NextApiHandler = async (req, res: NextApiResponse<ApiResponse>) => {
    try {
        const authSession = await validateAuthInApiHandler(req, res);

        const projectId = req.body.projectId;

        if (!projectId || !projectId.trim()) {
            throw new HttpError(BAD_REQUEST, "projectId is required");
        }

        const apiKey = await createUserApiKey(authSession.user, projectId);

        res.status(200).json({ data: apiKey });
    } catch (error: any) {
        console.log(error);
        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;