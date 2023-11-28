import { SafeMultisigTransactionResponse, SafeTransaction } from "@safe-global/safe-core-sdk-types";
import { Address } from "viem";
import { validateSignatory } from "./validateSafeSigner";
import { assetTransactionRepository } from "@/resources/constants";
import { ContractReceipt } from "ethers";
import { AssetTransactionStatus, AssetTransactionType, AuthorizationRequest as AuthorizationRequestStatus } from "@/resources/enums";
import { getConcatenatedId } from "@/resources/utils/helperfunctions";
import { getSafeTxnRejectionMailOption } from "@/resources/utils/email/helpers";
import MailService from "@/resources/utils/email";

export const executeTransaction = async (safeAddress: Address, transaction: SafeTransaction | SafeMultisigTransactionResponse) => {

    const { safe } = await validateSignatory(safeAddress);

    return await safe.executeTransaction(transaction);
}

export const acceptTransaction = async (safeAddress: Address, safeTransactionHash: string): Promise<ContractReceipt> => {
    const { safe } = await validateSignatory(safeAddress);

    const txResponse = await safe.approveTransactionHash(safeTransactionHash)

    const contractReceipt = await txResponse.transactionResponse?.wait();

    if (!contractReceipt) {
        throw new Error("Error approving transaction");
    }

    return contractReceipt as ContractReceipt;
}

export const rejectTransaction = async (safeAddress: Address, safeTransactionNonce: number) => {
    const { safe, currentUser } = await validateSignatory(safeAddress);

    const rejectionTransaction = await safe.createRejectionTransaction(safeTransactionNonce);

    const rejectionHash = "";

    // TODO: figure out what to return 

    /*  const link = `${process.env.HOST_LINK}/authorization?projectId=${projectId}&requestId=${authorizationRequest.id}`;
 
     const mailOptions = getSafeTxnRejectionMailOption(
         {
             email: currentUser.user.email,
             projectName: projectName,
             assetName: assetName,
             link
         }); */
}