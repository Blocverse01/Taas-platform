import { HttpError } from "@/lib/errors";
import { deleteAssetDocument } from "@/lib/taas-api/asset/deleteAssetDocument";
import { DeleteAssetDocumentSchema } from "@/lib/taas-api/asset/validationSchema";
import { validateAuthInApiHandler } from "@/utils/auth";
import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from "@/utils/constants";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await validateAuthInApiHandler(req, res);

        if (!session) {
            res.status(UNAUTHORIZED).send({});
        }

        const { documentId } = await DeleteAssetDocumentSchema.validate(req.body);

        await deleteAssetDocument(documentId);

        res.status(OK).json({ message: "Document deleted Successfully" });

    } catch (error: any) {
        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;
