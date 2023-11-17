import { assetDocumentRepository, assetPropertyRepository, projectRepository } from "@/utils/constants";
import { Address } from "viem";
import { TokenizedRealEstateData } from "./types";

export async function updateTokenizedRealEstateDetails(
    assetId: string,
    tokenAddress: Address,
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
        tokenAddress,
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

export async function updateAssetDocumentLable(
    documentId: string, label: string
) {
    const document = await assetDocumentRepository().read(documentId);

    if (!document) {
        throw new Error("Document Not Found");
    }

    await document.update({ label });
}

