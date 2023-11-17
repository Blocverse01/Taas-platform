import { HttpError } from "@/lib/errors";
import { updateAssetDocumentLable } from "@/lib/taas-api/asset/updateAsset";
import { } from "@/lib/taas-api/token/createToken";
import { validateAuthInApiHandler } from "@/utils/auth";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "@/utils/constants";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await validateAuthInApiHandler(req, res);

        const { documentId, lable } = req.body;

        if (!documentId.trim() || !lable) {
            throw new HttpError(BAD_REQUEST, "Invalid Body Properties");
        }

        await updateAssetDocumentLable(documentId, lable);

        res.status(OK).json({ message: "Document Lable Updated Successfully" });
    } catch (error: any) {

        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;
