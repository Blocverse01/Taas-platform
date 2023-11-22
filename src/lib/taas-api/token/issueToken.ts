import { Address, TransactionReceipt } from "viem";
import { getSafeOwnersWhoHaveApproved, getSafeThreshold } from "@/lib/safe/getSafeDetails";
import { getSafeService } from "@/lib/safe";
import { executeTransaction } from "@/lib/safe/executeTransaction";
import { storeProjectActivityLogItem } from "../activityLog/createActivityLog";
import { ActivityLogAssetSubCategory, ActivityLogCategory, ActivityLogProjectSubCategory } from "../activityLog/types";
import { createActivityLogTitle } from "../activityLog/activityLogUtils";
import { getTransactionExplorerUrl } from "@/utils/web3/connection";
import { getAsset } from "./getTokenInformation";

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

    //TODO: Update this function to provide appriopiate info for the activity log
    await storeProjectActivityLogItem("options.project.id", {
        title: createActivityLogTitle(ActivityLogAssetSubCategory["executeTxn"], ActivityLogCategory["asset"], transactionHash),
        category: ActivityLogCategory["asset"],
        ctaLink: getTransactionExplorerUrl(transactionHash),
        ctaText: "View Transaction",
        subCategory: ActivityLogAssetSubCategory["executeTxn"],
        actor: contractReceipt.from
    });

    return { txHash: contractReceipt.transactionHash as Address, status: receiptStatus }
};

export { executeIssueTokenTransaction };
