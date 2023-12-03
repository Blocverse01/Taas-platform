import { NOT_FOUND, assetDocumentRepository, assetPropertyRepository } from "@/utils/constants";
import { AssetDetails, AssetDocumentLable, AssetPhoto, AssetTokenDetails } from "./types";
import { HttpError } from "@/lib/errors";

export async function updateAssetDetails(
    data: AssetDetails
) {
    const asset = await assetPropertyRepository().read(data.assetId);

    if (!asset) {
        throw new HttpError(NOT_FOUND, 'Asset Not Found"')
    }

    await asset.update({
        description: data.propertyDescription,
        location: data.propertyLocation,
        size: data.propertySize,
        valuation: parseFloat(`${data.valuation}`),
    });

}


export async function updateTokenDetails(
    data: AssetTokenDetails
) {

    const asset = await assetPropertyRepository().read(data.assetId);

    if (!asset) {
        throw new HttpError(NOT_FOUND, 'Asset Not Found"')
    }

    await asset.update({
        name: data.propertyName,
        tokenTicker: data.tokenTicker,
        tokenPrice: data.pricePerToken
    });

}

export async function updateAssetPhotos(
    data: AssetPhoto
) {
    const asset = await assetPropertyRepository().read(data.assetId);
    if (!asset) {
        throw new HttpError(NOT_FOUND, "Asset Not Found");
    }
    await asset.update({ photos: data.photos });
}

export async function updateAssetDocumentLabel(
    data: AssetDocumentLable
) {
    const document = await assetDocumentRepository().read(data.documentId);

    if (!document) {
        throw new Error("Document Not Found");
    }

    await document.update({ label: data.label });
}


