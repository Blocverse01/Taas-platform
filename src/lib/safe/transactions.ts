import { Address } from "viem"
import Safe, { AddOwnerTxParams, RemoveOwnerTxParams } from "@safe-global/protocol-kit";
import { SafeTransaction, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { validateSignatory } from "./validateSafeSigner";
import { getSafeService } from ".";
import { executeTransaction } from "./executeTransaction";

export const createRemoveSignatoryTransaction =
    async (safeAddress: Address, params: RemoveOwnerTxParams): Promise<SafeTransaction> => {

        const { safe } = await validateSignatory(safeAddress);

        return safe.createRemoveOwnerTx(params);
    }

export const createAddSignatoryTransaction =
    async (safeAddress: Address, params: AddOwnerTxParams): Promise<SafeTransaction> => {

        const { safe } = await validateSignatory(safeAddress);

        return await safe.createAddOwnerTx(params);
    }

export const createUpdateSafeWalletThreshold =
    async (safeAddress: Address, newThreshold: number): Promise<SafeTransaction> => {
        const { safe } = await validateSignatory(safeAddress);

        return await safe.createChangeThresholdTx(newThreshold);
    }

export const proposeTransaction = async (
    safeTransactionData: SafeTransactionDataPartial,
    safe: Safe,
    safeAddress: Address,
    senderAddress: Address) => {

    // Create a Safe transaction with the provided parameters
    const safeTransaction = await safe.createTransaction({ safeTransactionData });

    const nonce = safeTransaction.data.nonce;

    // Deterministic hash based on transaction parameters
    const safeTxHash = await safe.getTransactionHash(safeTransaction)

    // Sign transaction to verify that the transaction is coming from owner 1
    const senderSignature = await safe.signTransactionHash(safeTxHash)

    await getSafeService().proposeTransaction({
        safeAddress,
        safeTransactionData: safeTransaction.data,
        safeTxHash,
        senderAddress,
        senderSignature: senderSignature.data,
    });

    // TODO: Re-enable auto execution

    /* // Add confirmation and execute if proposer is the only signer
    const threshold = await safe.getThreshold();

    if (threshold === 1) {
        const response = await getSafeService().confirmTransaction(safeTxHash, senderSignature.data);

        if (!response) {
            throw new Error("Error confirming transaction");
        }

        const txResult = await executeTransaction(safeAddress, safeTransaction);

        const contractReceipt = await txResult.transactionResponse?.wait();

        if (!contractReceipt || !txResult.transactionResponse) {
            throw new Error("Error executing transaction");
        }

        return { txHash: contractReceipt.transactionHash, nonce: txResult.transactionResponse.nonce, autoExecuted: true }
    } */

    return { txHash: safeTxHash, nonce, autoExecuted: false };
}


//TODO : BATCH REMOVAL
//TODO : BATCH ADDITION