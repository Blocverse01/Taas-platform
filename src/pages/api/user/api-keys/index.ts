import { NextApiHandler, NextApiResponse } from "next";
import { INTERNAL_SERVER_ERROR } from "@/utils/constants";
import { validateAuthInApiHandler } from "@/utils/auth";
import { getUserApiKeys } from "@/lib/taas-api/apiKeys/getUserApiKeys";

type ApiResponse = {
    message?: string;
    data?: Awaited<ReturnType<typeof getUserApiKeys>>;
};

const handler: NextApiHandler = async (req, res: NextApiResponse<ApiResponse>) => {
    try {
        const authSession = await validateAuthInApiHandler(req, res);

        const apiKeys = await getUserApiKeys(authSession.user);

        res.status(200).json({ data: apiKeys });
    } catch (error: any) {
        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;