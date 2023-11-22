import {
  Address,
  TransactionReceipt as PreciseTransactionReceipt,
  decodeEventLog,
  encodeFunctionData,
} from "viem";
import {
  getAccount,
  getPublicClient,
  getWalletClient,
} from "@/utils/web3/connection";
import { PLATFORM_ENTRY } from "@/utils/web3/abis";
import { getContractAddress } from "@/utils/web3/contracts";
import { sponsorTransaction } from "@/lib/biconomy";
import { SPONSOR_TRANSACTION } from "@/utils/constants";
import { storeProjectActivityLogItem } from "../activityLog/createActivityLog";
import { ActivityLogAssetSubCategory, ActivityLogCategory, ActivityLogProjectSubCategory } from "../activityLog/types";
import { createActivityLogTitle } from "../activityLog/activityLogUtils";
import { getTransactionExplorerUrl } from "@/utils/web3/connection";

const CONTRACT_FUNCTION_NAME = "createTokenFactory" as const;

interface DeployFactoryResponse {
  tokenFactory: Address;
  txHash: Address;
}

const deployTokenFactory = async (
  multiSigSafeAddress: Address,
  treasuryAddress: Address
): Promise<DeployFactoryResponse> => {
  const account = await getAccount();
  const platformEntryAddress = getContractAddress("PLATFORM_ENTRY");
  const walletClient = getWalletClient();
  const publicClient = getPublicClient();

  const functionArgs = [
    multiSigSafeAddress,
    multiSigSafeAddress,
    treasuryAddress,
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
    return extractResponseFromReceipt(receipt, platformEntryAddress);
  }

  const { request } = await publicClient.simulateContract({
    account,
    address: platformEntryAddress,
    abi: PLATFORM_ENTRY,
    functionName: CONTRACT_FUNCTION_NAME,
    args: functionArgs,
  });

  const txHash = await walletClient.writeContract(request);
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: txHash,
  });

  //TODO: Update this function to provide appropiate info for the activity log
  await storeProjectActivityLogItem("", {
    title: createActivityLogTitle(ActivityLogProjectSubCategory["deployFactory"], txHash),
    category: ActivityLogCategory["project"],
    ctaLink: getTransactionExplorerUrl(txHash),
    ctaText: "View Transaction",
    subCategory: ActivityLogProjectSubCategory["deployFactory"],
    actor: receipt.from
  });

  return extractResponseFromReceipt(receipt, platformEntryAddress);
};

const extractResponseFromReceipt = (
  receipt: PreciseTransactionReceipt,
  platformEntryAddress: Address
) => {
  if (receipt.status === "reverted") throw new Error("Transaction failed");

  const log = receipt.logs.find(
    (l) => l.address.toLowerCase() === platformEntryAddress.toLowerCase()
  );
  if (!log) throw new Error("Reference log not found");

  const topics = decodeEventLog({
    eventName: "FactoryCreated",
    abi: PLATFORM_ENTRY,
    data: log.data,
    topics: log.topics,
  });
  const response = {
    tokenFactory: topics.args.contractAddress,
    txHash: receipt.transactionHash,
  };

  return response;
};

export { deployTokenFactory };
