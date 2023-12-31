//import { HttpError } from "@/lib/errors";
import { validateAuthInApiHandler } from "@/data/adapters/browser/auth";
import { updateTokenDetails } from "@/lib/taas-api/asset/updateAsset";
import { AssetTokenDetailsSchema } from "@/lib/taas-api/asset/validationSchema";
import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from "@/resources/constants";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const session = await validateAuthInApiHandler(req, res);

        if (!session) {
            res.status(UNAUTHORIZED).send({});
        }

        const { propertyName, tokenTicker, pricePerToken, assetId } = await AssetTokenDetailsSchema.validate(req.body);

        await updateTokenDetails({ propertyName, tokenTicker, pricePerToken, assetId });

        res.status(OK).json({ message: "Asset Token Details Updated Successfully" });

    } catch (error: any) {

        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;
