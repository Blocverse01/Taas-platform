import { AssetDocument } from "@/xata";

export interface TokenizedRealData {
    propertyName: string;
    propertyDescription: string;
    propertyLocation: string;
    propertySize: number;
    tokenTicker: string;
    pricePerToken: number;
    documents: Array<AssetDocument>;
    photos: Array<string>;
}