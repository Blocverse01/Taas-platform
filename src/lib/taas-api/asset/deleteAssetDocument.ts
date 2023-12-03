
import { assetDocumentRepository } from "@/utils/constants";
import { AssetDocument } from "./types";

export async function deleteAssetDocument(
    documentId : string
) {
    await assetDocumentRepository().delete(documentId);
}

