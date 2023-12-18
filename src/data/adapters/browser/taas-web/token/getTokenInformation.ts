import { Address } from "viem";
import { ASSET_TOKEN } from "@/resources/utils/web3/abis";
import { getPublicClient } from "@/resources/utils/web3/connection";
import { utils } from "@/resources/utils/web3/utils";
import { assetPropertyRepository } from "@/resources/constants";

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

const getProjectAssetCount = async (projectId: string) => {
    
        return (await assetPropertyRepository().filter({
            "project.id": projectId
        }).getMany()).length;
}

export { getTokenInformation, getAsset, getProjectAssetCount };