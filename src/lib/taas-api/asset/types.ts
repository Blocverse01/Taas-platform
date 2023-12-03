

export interface AssetTokenDetails {
    assetId: string;
    propertyName: string;
    tokenTicker: string;
    pricePerToken: number,
}

export interface AssetDetails {
    propertyDescription: string;
    propertyLocation: string;
    propertySize: number;
    valuation: number;
    assetId: string
}

export interface AssetPhoto {
    assetId: string,
    photos: Array<string>
}


export interface AssetDocumentLable {
    documentId: string,
    label: string
}

export interface AssetDocument {
    ownerId: string
    fileURI: string,
    label: string,
    fileSize: number,
    fileType: string,
    assetId: string,
}