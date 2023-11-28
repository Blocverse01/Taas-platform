

import { HttpError } from "@/lib/errors";
import { AssetTokenDetails } from "@/lib/taas-api/asset/types";
import { UpdateAssetDetails } from "@/lib/taas-api/asset/updateAsset";
import { AssetDetailsSchema } from "@/lib/taas-api/asset/validationSchema";
import { validateAuthInApiHandler } from "@/utils/auth";
import { INTERNAL_SERVER_ERROR, OK } from "@/utils/constants";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await validateAuthInApiHandler(req, res);

        const { propertyDescription, propertyLocation, propertySize, assetId, valuation } = await AssetDetailsSchema.validate(req.body);

        await UpdateAssetDetails({ propertyDescription, propertyLocation, propertySize, assetId, valuation });

        res.status(OK).json({ message: "Asset Details Updated Successfully" });

    } catch (error: any) {

        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;
