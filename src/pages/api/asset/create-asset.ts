import { HttpError } from "@/resources/errors";
import { storeTokenizedRealEstate } from "@/data/adapters/server/taas-api/token/storeToken";
import { storeProjectAssetFormData } from "@/data/adapters/browser/taas-web/token/tokenizedAsset";
import { validateAuthInApiHandler } from "@/data/adapters/browser/auth";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from "@/resources/constants";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Address } from "viem";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await validateAuthInApiHandler(req, res);

        if (!session) {
            res.status(UNAUTHORIZED).send({});
        }

        const { projectId, tokenAddress, realestateData } = req.body;

        if (!projectId.trim() || !tokenAddress.trim() || !realestateData) {
            throw new HttpError(BAD_REQUEST, "Invalid Body Properties");
        }

        await storeTokenizedRealEstate(projectId, tokenAddress as Address, realestateData);

        res.status(OK).json({ message: "Project Created Successfully" });
    } catch (error: any) {
        console.log(error);
        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;
