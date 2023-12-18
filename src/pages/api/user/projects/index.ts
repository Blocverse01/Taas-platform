import { NextApiHandler, NextApiResponse } from "next";
import { INTERNAL_SERVER_ERROR } from "@/resources/constants";
import { validateAuthInApiHandler } from "@/data/adapters/browser/auth";
import { getUserProjects } from "@/data/adapters/server/taas-api/project/getUserProjects";

type ApiResponse = {
    message?: string;
    data?: Awaited<ReturnType<typeof getUserProjects>>;
};

const handler: NextApiHandler = async (req, res: NextApiResponse<ApiResponse>) => {
    try {
        const authSession = await validateAuthInApiHandler(req, res);

        const projects = await getUserProjects(authSession.user);

        res.status(200).json({ data: projects });
    } catch (error: any) {
        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;