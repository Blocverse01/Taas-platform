import { Address } from "viem";

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

export interface CreateProjectAssetOptions {
    project: {
        id: string;
    },
    tokenAddress: Address;
    description: string;
    location: string;
    size: number;
    tokenPrice: number;
    tokenTicker: string;
    photos: Array<string>;
    valuation: number;
    name: string;
}