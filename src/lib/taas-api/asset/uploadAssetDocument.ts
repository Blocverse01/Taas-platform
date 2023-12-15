import { assetDocumentRepository } from "@/resources/constants";
import { AssetDocument } from "./types";



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

