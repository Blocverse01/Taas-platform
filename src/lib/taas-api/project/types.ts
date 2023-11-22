import { AssetDocument } from "@/xata";
import { Address } from "viem";

export interface TAASProject {
    name: string;
    assetType: AssetType;
    createdAt: string;
    id: string;
    multisigController: Address;
    treasuryWallet: Address;
    ownerId: string,
    tokenFactory: Address,
    web3Environment: "testnet" | "mainnet",
    enabledPaymentMethods: Address[]
}

export interface TokenizedAsset {
    id: string;
    name: string;
    tokenAddress: Address;
    tokenPrice: number;
    tokenTicker: string;
    description: string;
    media: Array<{
        type: string;
        fileURI: string;
    }>;
    documents: Array<Pick<AssetDocument, "fileType" | "fileSize" | "fileURI" | "label" | "id">>;
    type: AssetType;
    valuation: number;
}

export interface TokenizedProperty extends TokenizedAsset {
    location: string;
    size: number;
    displayImage: string;
}

export interface CreateNewProjectOptions {
    assetType: string;
    userId: string
    name: string;
    blockchain: string,
    treasuryWallet: string,
    multiSigController: Address,
    tokenFactory: Address
}

export type CreateProjectTeammatePayload = {
    projectId: string;
    projectName: string;
    userId: string;
    role: number,
    isActive: boolean
}