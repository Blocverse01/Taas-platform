import { getAccount } from "./account";
import { getPublicClient } from "./viemClients";
import { utils } from "../utils";
import { Address } from "viem";
import { balanceAbi } from "../abis";

const getNativeBalance = async (walletAddress?: Address) => {
  const address = walletAddress ?? (await getAccount());
  const publicClient = getPublicClient();

  const balance = await publicClient.getBalance({
    address,
  });

  return parseFloat(utils.formatEther(balance));
};

const getTokenBalance = async (tokenAddress: Address, walletAddress?: Address) => {
  const address = walletAddress ?? (await getAccount());
  const publicClient = getPublicClient();

  const [balance, decimals] = await Promise.all([
    await publicClient.readContract({
      address: tokenAddress,
      abi: balanceAbi,
      functionName: "balanceOf",
      args: [address],
    }),
    await publicClient.readContract({
      address: tokenAddress,
      abi: balanceAbi,
      functionName: "decimals",
    }),
  ]);

  return parseFloat(utils.formatUnits(balance, decimals));
};

export { getNativeBalance, getTokenBalance };
