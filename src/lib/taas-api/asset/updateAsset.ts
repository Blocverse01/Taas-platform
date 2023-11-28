import { NOT_FOUND, assetDocumentRepository, assetPropertyRepository } from "@/utils/constants";
import { AssetDetails, AssetTokenDetails } from "./types";
import { HttpError } from "@/lib/errors";

export async function UpdateAssetDetails(
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


export async function UpdateTokenDetails(
    data: AssetTokenDetails
) {

    const asset = await assetPropertyRepository().read(data.assetId);

    // if (!asset) {
    //     throw new HttpError(NOT_FOUND, 'Asset Not Found"')
    // }

    // await asset.update({
    //     tokenTicker: data.tokenTicker,
    //     tokenPrice: data.pricePerToken,
    //     valuation : 
    // });

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


