import { Address } from "viem";

interface TokenizeAssetResponse {
  tokenAddress: Address;
  txHash: Address;
}

const tokenizeAsset = async (
  tokenFactory: Address,
  tokenTicker: string,
  tokenPrice: number,
  tokenName: string
): Promise<TokenizeAssetResponse> => {
    // Todo: Add implementation from previous repo
    return {
        tokenAddress: "0x0",
        txHash: "0x0"
    }
}

export {tokenizeAsset}