import { HttpError } from "@/lib/errors";
import { updateAssetDocumentLabel } from "@/lib/taas-api/asset/updateAsset";
import { validateAuthInApiHandler } from "@/utils/auth";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "@/utils/constants";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await validateAuthInApiHandler(req, res);

        const { documentId, label } = req.body;

        if (!documentId.trim() || !label) {
            throw new HttpError(BAD_REQUEST, "Invalid Body Properties");
        }

        await updateAssetDocumentLabel(documentId, label);

        res.status(OK).json({ message: "Document label Updated Successfully" });
    } catch (error: any) {

        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;
