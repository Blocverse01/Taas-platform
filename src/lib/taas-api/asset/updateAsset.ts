import { assetDocumentRepository, assetPropertyRepository, projectRepository } from "@/utils/constants";
import { TokenizedRealEstateData } from "./types";

export async function updateTokenizedRealEstateDetails(
    assetId: string,
    realEstateData: TokenizedRealEstateData
) {
    const asset = await assetPropertyRepository().read(assetId);

    if (!asset) {
        throw new Error("Asset Not Found");
    }

    const {
        propertyName,
        propertyDescription,
        propertyLocation,
        propertySize,
        tokenTicker,
        pricePerToken,
        valuation
    } = realEstateData;

    await asset.update({
        tokenTicker,
        name: propertyName,
        description: propertyDescription,
        location: propertyLocation,
        size: propertySize,
        tokenPrice: pricePerToken,
        valuation: parseFloat(`${valuation}`),
    });

}

export async function updateTokenizedRealEstatePhotos(
    assetId: string, photos: Array<string>
) {
    const asset = await assetPropertyRepository().read(assetId);
    if (!asset) {
        throw new Error("Asset Not Found");
    }
    await asset.update({ photos });
}

export async function updateAssetDocumentLabel(
    documentId: string, label: string
) {
    const document = await assetDocumentRepository().read(documentId);

    if (!document) {
        throw new Error("Document Not Found");
    }

    await document.update({ label });
}

