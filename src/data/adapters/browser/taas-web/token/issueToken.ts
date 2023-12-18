import { Address, TransactionReceipt } from "viem";
import { getSafeOwnersWhoHaveApproved, getSafeThreshold } from "@/data/adapters/browser/safe/getSafeDetails";
import { getSafeService } from "@/data/adapters/browser/safe";
import { executeTransaction } from "@/data/adapters/browser/safe/executeTransaction";

interface TxResponse {
    status: TransactionReceipt["status"];
    txHash: Address;
}

const executeIssueTokenTransaction = async (
    safeAddress: Address,
    transactionHash: Address
): Promise<TxResponse> => {
    const safeThreshold = await getSafeThreshold(safeAddress);

    const numberOfConfirmations = await getSafeOwnersWhoHaveApproved(transactionHash, safeAddress);

    if (numberOfConfirmations.length < safeThreshold) {
        throw new Error(`Issuing a token requires ${safeThreshold} signatures. This transaction has only ${numberOfConfirmations.length} signatures`);
    }

    const safeTransaction = await getSafeService().getTransaction(transactionHash);

    const txResult = await executeTransaction(safeAddress, safeTransaction);

    const contractReceipt = await txResult.transactionResponse?.wait();

    if (!contractReceipt || !txResult.transactionResponse) {
        throw new Error("Error executing transaction");
    }

    const receiptStatus: TxResponse["status"] = contractReceipt.status === 1 ? "success" : "reverted";

    if (receiptStatus === "reverted") {
        throw new Error("Transaction failed");
    }

    return { txHash: contractReceipt.transactionHash as Address, status: receiptStatus }
};

export { executeIssueTokenTransaction };
