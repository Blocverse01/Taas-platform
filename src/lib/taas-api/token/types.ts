export interface TokenizedRealData {
    propertyName: string;
    propertyDescription: string;
    propertyLocation: string;
    propertySize: number;
    tokenTicker: string;
    pricePerToken: number;
    documents: Array<UploadedAssetDocument>;
    photos: Array<string>;
    valuation: number;
}