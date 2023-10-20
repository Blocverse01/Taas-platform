import { NextApiHandler, NextApiResponse } from "next";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "@/utils/constants";
import { validateAuthInApiHandler } from "@/utils/auth";
import { deleteUserApiKey } from "@/lib/taas-api/apiKeys/deleteUserApiKey";
import { HttpError } from "@/lib/errors";

type ApiResponse = {
    message?: string;
};

const handler: NextApiHandler = async (req, res: NextApiResponse<ApiResponse>) => {
    try {
        const authSession = await validateAuthInApiHandler(req, res);

        const apiKeyId = req.body.apiKeyId;

        if (!apiKeyId || !apiKeyId.trim()) {
            throw new HttpError(BAD_REQUEST, "apiKeyId is required");
        }

        await deleteUserApiKey(authSession.user, apiKeyId);

        res.status(200).json({ message: "Deleted" });
    } catch (error: any) {
        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;