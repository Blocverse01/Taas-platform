import { HttpError } from "@/resources/errors";
import { getProjectActivityLog } from "@/data/adapters/server/taas-api/activityLog/createActivityLog";
import { validateAuthInApiHandler } from "@/data/adapters/browser/auth";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "@/resources/constants";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ActivityLogResponseItem } from "@/types/api/ActivityLog";

type ActivityLogResponse = {
    message?: string,
    data?: {
        recentActivities: Array<ActivityLogResponseItem>
    }
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<ActivityLogResponse>) => {
    try {
        await validateAuthInApiHandler(req, res);

        let { projectId } = req.query;

        projectId = projectId?.toString();

        if (!projectId || !projectId.toString().trim()) {
            throw new HttpError(BAD_REQUEST, "projectId is required");
        }

        const activityLog = await getProjectActivityLog(projectId);

        res.status(OK).json({
            message: "Success", data: {
                recentActivities: activityLog
            }
        });
    } catch (error: any) {

        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;