
import { NOT_FOUND, assetDocumentRepository } from "@/utils/constants";
import { AssetDocument } from "./types";
import { HttpError } from "@/lib/errors";

export async function uploadAssetDocument(
    data: AssetDocument
) {

    await assetDocumentRepository().create({
        fileURI: data.fileURI,
        label: data.label,
        fileSize: data.fileSize,
        fileType: data.fileType,
        property: data.assetId,
        ownerId: data.ownerId,
        ownerType: 'real estate'
    });

}

