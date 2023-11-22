import { HttpError } from "@/lib/errors";
import { getProjectActivityLog } from "@/lib/taas-api/activityLog/createActivityLog";
import { validateAuthInApiHandler } from "@/utils/auth";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "@/utils/constants";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await validateAuthInApiHandler(req, res);

        const { projectId, logItem } = req.body;

        if (!projectId || !projectId.trim()) {
            throw new HttpError(BAD_REQUEST, "projectId is required");
        }

        const log = await getProjectActivityLog(projectId);

        res.status(OK).json({ message: "Project Logs Retrieved Successfully", data: log });
    } catch (error: any) {
       
        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;