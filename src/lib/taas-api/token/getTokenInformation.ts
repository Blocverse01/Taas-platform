import { Address } from "viem";
import { ASSET_TOKEN } from "@/utils/web3/abis";
import { getPublicClient } from "@/utils/web3/connection";
import { utils } from "@/utils/web3/utils";

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

export { getTokenInformation };