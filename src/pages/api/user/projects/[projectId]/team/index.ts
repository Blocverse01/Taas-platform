import { NextApiHandler, NextApiResponse } from "next";
import { INTERNAL_SERVER_ERROR } from "@/resources/constants";
import { validateAuthInApiHandler } from "@/data/adapters/browser/auth";
import { getTeamMembers } from "@/data/adapters/server/taas-api/team";

type ApiResponse = {
    message?: string;
    data?: Awaited<ReturnType<typeof getTeamMembers>>;
};

const handler: NextApiHandler = async (req, res: NextApiResponse<ApiResponse>) => {
    try {
        const authSession = await validateAuthInApiHandler(req, res);

        const projectId = req.query.projectId;
        if (!projectId) {
            return res.status(404).json({ message: "Project not found" });
        }

        const teamMembers = await getTeamMembers(authSession.user, projectId as string);

        res.status(200).json({ data: teamMembers });
    } catch (error: any) {
        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;