import { HttpError } from "@/lib/errors";
import { uploadAssetDocument } from "@/lib/taas-api/asset/uploadAssetDocument";
import { AssetDocumentSchema } from "@/lib/taas-api/asset/validationSchema";
import { validateAuthInApiHandler } from "@/utils/auth";
import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from "@/utils/constants";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await validateAuthInApiHandler(req, res);

        if (!session) {
            res.status(UNAUTHORIZED).send({});
        }

        const ownerId: string = session.user.id;
        const { fileURI, label, fileSize, fileType, assetId } = await AssetDocumentSchema.validate(req.body);

        await uploadAssetDocument({ fileURI, label, fileSize, fileType, assetId, ownerId });

        res.status(OK).json({ message: "Assets Document uploaded Successfully" });

    } catch (error: any) {
        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;
