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
} from "@/resources/utils/web3/connection";
import { getContractAddress } from "@/resources/utils/web3/contracts";
import { SPONSOR_TRANSACTION } from "@/resources/constants";
import { PLATFORM_ENTRY } from "@/resources/utils/web3/abis";
import { sponsorTransaction } from "@/data/adapters/browser/biconomy";
import { ethers } from "ethers";
import { getMagicClient } from "@/data/adapters/browser/magic/webClient";

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
  const magicClient = getMagicClient();  

  

  if (SPONSOR_TRANSACTION) {

    

    const provider = new ethers.providers.Web3Provider(magicClient.rpcProvider as any);

    const contract = new ethers.Contract(platformEntryAddress, PLATFORM_ENTRY, provider);

    const tx = await contract.populateTransaction.createTokenFactory(multiSigSafeAddress,
      multiSigSafeAddress,
      treasuryAddress);

    const tx1 = {
      to: platformEntryAddress,
      data: tx.data
    }

    const txHash = await sponsorTransaction({
      data: tx.data,
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
    args: [multiSigSafeAddress,
      multiSigSafeAddress,
      treasuryAddress,],
  });

  const txHash = await walletClient.writeContract(request);
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: txHash,
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
