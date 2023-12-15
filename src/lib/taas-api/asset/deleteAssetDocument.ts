import { assetDocumentRepository } from "@/resources/constants";


export async function deleteAssetDocument(
    documentId : string
) {
    await assetDocumentRepository().delete(documentId);
}

