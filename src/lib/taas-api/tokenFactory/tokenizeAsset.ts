import {
  Address,
  decodeEventLog,
  encodeFunctionData,
  TransactionReceipt as PreciseTransactionReceipt,
  hashMessage,
} from "viem";
import { TOKEN_FACTORY, PLATFORM_ENTRY } from "@/utils/web3/abis";
import {
  getAccount,
  getPublicClient,
  getWalletClient,
} from "@/utils/web3/connection";
import { utils } from "@/utils/web3/utils";
import { getContractAddress } from "@/utils/web3/contracts";
import { sponsorTransaction } from "@/lib/biconomy";
import { SPONSOR_TRANSACTION } from "@/utils/constants";

const CONTRACT_FUNCTION_NAME = "createToken" as const;
const INTER_CHAIN_TOKEN_SERVICE =
  "0xF786e21509A9D50a9aFD033B5940A2b7D872C208" as const;

interface TokenizeAssetResponse {
  tokenAddress: Address;
  txHash: Address;
  actor: Address;
}

const tokenizeAsset = async (
  tokenFactory: Address,
  tokenTicker: string,
  tokenPrice: number,
  tokenName: string
): Promise<TokenizeAssetResponse> => {
  const account = await getAccount();
  const publicClient = getPublicClient();
  const walletClient = getWalletClient();
  const platformEntryAddress = getContractAddress("PLATFORM_ENTRY");

  const salt = hashMessage(tokenName);

  const functionArgs = [
    tokenFactory,
    salt,
    INTER_CHAIN_TOKEN_SERVICE,
    tokenName,
    tokenTicker,
    utils.parseEther(`${tokenPrice}`),
  ] as const;

  if (SPONSOR_TRANSACTION) {
    const encodedData = encodeFunctionData({
      abi: PLATFORM_ENTRY,
      functionName: CONTRACT_FUNCTION_NAME,
      args: functionArgs,
    });

    const txHash = await sponsorTransaction({
      data: encodedData,
      to: platformEntryAddress,
    });
    const receipt = await publicClient.getTransactionReceipt({
      hash: txHash,
    });
    return extractResponseFromReceipt(receipt, tokenFactory);
  }

  const { request } = await publicClient.simulateContract({
    account,
    address: platformEntryAddress,
    abi: PLATFORM_ENTRY,
    functionName: "createToken",
    args: functionArgs,
  });

  const txHash = await walletClient.writeContract(request);
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: txHash,
  });

  return {
    ...extractResponseFromReceipt(receipt, tokenFactory),
    actor: account,
  };
};

const extractResponseFromReceipt = (
  receipt: PreciseTransactionReceipt,
  tokenFactoryAddress: Address
) => {
  if (receipt.status === "reverted") throw new Error("Transaction failed");

  const log = receipt.logs.find(
    (l) => l.address.toLowerCase() === tokenFactoryAddress.toLowerCase()
  );
  if (!log) throw new Error("Reference log not found");

  const topics = decodeEventLog({
    eventName: "TokenCreated",
    abi: TOKEN_FACTORY,
    data: log.data,
    topics: log.topics,
  });
  const response = {
    tokenAddress: topics.args.contractAddress,
    txHash: receipt.transactionHash,
  };
  return response;
};

export { tokenizeAsset };
