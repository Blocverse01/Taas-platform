import { HttpError } from "@/lib/errors";
import { AssetTokenDetails } from "@/lib/taas-api/asset/types";
import { UpdateAssetDetails, UpdateTokenDetails } from "@/lib/taas-api/asset/updateAsset";
import { AssetTokenDetailsSchema } from "@/lib/taas-api/asset/validationSchema";
import { validateAuthInApiHandler } from "@/utils/auth";
import { INTERNAL_SERVER_ERROR, OK } from "@/utils/constants";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await validateAuthInApiHandler(req, res);

        const { propertyName, tokenTicker, pricePerToken, assetId } = await AssetTokenDetailsSchema.validate(req.body);

        await UpdateTokenDetails({ propertyName, tokenTicker, pricePerToken, assetId });

        res.status(OK).json({ message: "Asset Token Details Updated Successfully" });

    } catch (error: any) {

        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;
