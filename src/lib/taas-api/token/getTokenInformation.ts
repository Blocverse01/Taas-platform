import { Address } from "viem";
import { ASSET_TOKEN } from "@/utils/web3/abis";
import { getPublicClient } from "@/utils/web3/connection";
import { utils } from "@/utils/web3/utils";
import { assetPropertyRepository } from "@/utils/constants";

const getTokenInformation = async (tokenAddress: Address) => {
    const publicClient = getPublicClient();

    const totalSupply = await publicClient.readContract({
        address: tokenAddress,
        abi: ASSET_TOKEN,
        functionName: "totalSupply",
    });

    const formattedTotalSupply = parseFloat(utils.formatUnits(totalSupply, 18));

    return { totalSupply: formattedTotalSupply };
};

const getAsset = async (tokenAddress: Address) => {

    const assetToken = await assetPropertyRepository().filter({
        tokenAddress
    }).getFirstOrThrow();

    return assetToken;
};

export { getTokenInformation, getAsset };