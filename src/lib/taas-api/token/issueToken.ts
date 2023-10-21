import { Address, TransactionReceipt, parseTransaction } from "viem";
import {
    getPublicClient,
    getWalletClient,
} from "@/utils/web3/connection";
import { getContractAddress } from "@/utils/web3/contracts";
import { sponsorTransaction } from "@/lib/biconomy";
import { SPONSOR_TRANSACTION } from "@/utils/constants";
import { getSafeOwnersWhoHaveApproved, getSafeThreshold } from "@/lib/safe/getSafeDetails";

interface TxResponse {
    status: TransactionReceipt["status"];
    txHash: Address;
}

const executeIssueTokenTransaction = async (
    safeAddress: Address,
    transactionHash: Address
): Promise<TxResponse> => {
    const publicClient = getPublicClient();
    const walletClient = getWalletClient();
    const platformEntryAddress = getContractAddress("PLATFORM_ENTRY");

    const safeThreshold = await getSafeThreshold(safeAddress);

    const numberOfConfirmations = await getSafeOwnersWhoHaveApproved(transactionHash, safeAddress);

    if (numberOfConfirmations.length < safeThreshold) {
        throw new Error(`Issuing a token requires ${safeThreshold} signatures. This transaction has only ${numberOfConfirmations.length} signatures`);
    }

    const parsedTransaction = parseTransaction(transactionHash);

    if (SPONSOR_TRANSACTION) {
        const txHash = await sponsorTransaction({
            ...parsedTransaction,
            to: platformEntryAddress
        });

        const receipt = await publicClient.getTransactionReceipt({
            hash: txHash,
        });
        if (receipt.status === "reverted") throw new Error("Transaction failed");
        return {
            status: receipt.status,
            txHash,
        };
    }

    const txHash = await walletClient.sendRawTransaction({
        serializedTransaction: transactionHash,
    });

    const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
    });

    if (receipt.status === "reverted") throw new Error("Transaction failed");
    return { status: receipt.status, txHash };
};

export { executeIssueTokenTransaction };
