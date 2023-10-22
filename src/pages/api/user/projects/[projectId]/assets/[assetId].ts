import { NextApiHandler, NextApiResponse } from "next";
import { INTERNAL_SERVER_ERROR } from "@/utils/constants";
import { validateAuthInApiHandler } from "@/utils/auth";
import { getProjectAsset } from "@/lib/taas-api/project/getProjectAsset";

type ApiResponse = {
    message?: string;
    data?: Awaited<ReturnType<typeof getProjectAsset>>;
};

const handler: NextApiHandler = async (req, res: NextApiResponse<ApiResponse>) => {
    try {
        const authSession = await validateAuthInApiHandler(req, res);

        const projectId = req.query.projectId;
        const assetId = req.query.assetId;

        if (!projectId) {
            return res.status(404).json({ message: "Project not found" });
        }

        if (!assetId) {
            return res.status(404).json({ message: "Project not found" });
        }

        const asset = await getProjectAsset(authSession.user, projectId as string, assetId as string);

        res.status(200).json({ data: asset });
    } catch (error: any) {
        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler; 