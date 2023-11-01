import { CREATE_ASSET_ENDPOINT } from "./constants";
import { TokenizedRealData } from "@/lib/taas-api/token/types";
import { Address } from "viem";

export const storeProjectAssetFormData = async (projectId: string, tokenAddress: Address, payload: TokenizedRealData) => {
    try {
        const response = await fetch(CREATE_ASSET_ENDPOINT, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                projectId,
                tokenAddress,
                realestateData: payload
            })
        });

        if (!response.ok) throw new Error("Data storing failed");

        return await response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
};
