import { HttpError } from "@/resources/errors";
import { getProjectActivityLog } from "@/data/adapters/server/taas-api/activityLog/createActivityLog";
import { validateAuthInApiHandler } from "@/data/adapters/browser/auth";
import { BAD_REQUEST, FOUR, INTERNAL_SERVER_ERROR, OK, TEN, ONE_THOUSAND } from "@/resources/constants";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getAssetCount } from "@/data/adapters/server/taas-api/token/getAssetCount";
import { ProjectDashboardResponse } from "@/types/api/Project";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<ProjectDashboardResponse>) => {
    try {
        await validateAuthInApiHandler(req, res);

        let { projectId } = req.query;

        projectId = projectId?.toString();

        if (!projectId || !projectId.toString().trim()) {
            throw new HttpError(BAD_REQUEST, "projectId is required");
        }

        const activityLog = await getProjectActivityLog(projectId);

        const assetCount = await getAssetCount(projectId);

        //const treasuryBalance = await getTreasuryBalance(projectId);

        res.status(OK).json({
            message: "Success", data: {
                assets: {
                    volume: assetCount,
                    weeklyTrend: FOUR,
                },
                treasuryBalance: {
                    volume: ONE_THOUSAND,
                    weeklyTrend: TEN,
                },
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