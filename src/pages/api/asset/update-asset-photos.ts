import { HttpError } from "@/lib/errors";
import { updateTokenizedRealEstatePhotos } from "@/lib/taas-api/asset/updateAsset";
import { validateAuthInApiHandler } from "@/utils/auth";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "@/utils/constants";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await validateAuthInApiHandler(req, res);

        const { assetId, photos } = req.body;

        if (!assetId.trim() || !photos) {
            throw new HttpError(BAD_REQUEST, "Invalid Body Properties");
        }

        await updateTokenizedRealEstatePhotos(assetId, photos);

        res.status(OK).json({ message: "Asset Photos Updated Successfully" });
    } catch (error: any) {

        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;
