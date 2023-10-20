import { SafeTransaction } from "@safe-global/safe-core-sdk-types";
import { Address } from "viem";
import { validateSignatory } from "./validateSafeSigner";
import { assetTransactionRepository, authorizationRequestRepository } from "@/utils/constants";
import { ContractReceipt } from "ethers";
import { AssetTransactionStatus, AssetTransactionType, AuthorizationRequest as AuthorizationRequestStatus } from "@/utils/enums";
import { getConcatenatedId } from "@/utils/helperfunctions";
import { getSafeTxnRejectionMailOption } from "@/utils/email/helpers";
import MailService from "@/utils/email";

export const executeTransaction = async (safeAddress: Address, transaction: SafeTransaction) => {

    const { safe } = await validateSignatory(safeAddress);

    return await safe.executeTransaction(transaction);
}

export const acceptTransaction = async (authorizationRequestId: string): Promise<ContractReceipt> => {

    const authorizationRequest =
        await authorizationRequestRepository()
            .read(
                authorizationRequestId,
                ['transaction.safeTransactionHash', 'transaction.asset.project.multisigController']
            );

    if (
        !authorizationRequest ||
        !authorizationRequest.transaction ||
        !authorizationRequest.transaction.safeTransactionHash ||
        !authorizationRequest.transaction.asset?.project?.multisigController) {
        throw new Error(
            !authorizationRequest ? "Invalid Authorization Request" :
                !authorizationRequest.transaction ? "Invalid Authorization Request Transaction" :
                    !authorizationRequest.transaction.safeTransactionHash ? "Invalid Authorization Request Transaction Hash" :
                        "Invalid Multisig Controller Address");
    }

    const safeAddress = authorizationRequest.transaction.asset.project.multisigController as Address;

    const safeTransactionHash = authorizationRequest.transaction.safeTransactionHash;

    const { safe } = await validateSignatory(safeAddress);

    const txResponse = await safe.approveTransactionHash(safeTransactionHash)

    const contractReceipt = await txResponse.transactionResponse?.wait();

    if (!contractReceipt) {
        throw new Error("Error approving transaction");
    }

    return contractReceipt as ContractReceipt;
}

export const rejectTransaction = async (authorizationRequestId: string) => {

    const authorizationRequest =
        await authorizationRequestRepository()
            .read(
                authorizationRequestId,
                ['transaction.*', 'transaction.asset.project.*', '*']
            );

    if (
        !authorizationRequest ||
        !authorizationRequest.transaction ||
        !authorizationRequest.transaction.safeTransactionNonce ||
        !authorizationRequest.transaction.asset?.project?.multisigController) {
        throw new Error(
            !authorizationRequest ? "Invalid Authorization Request" :
                !authorizationRequest.transaction ? "Invalid Authorization Request Transaction" :
                    !authorizationRequest.transaction.safeTransactionNonce ? "Invalid Authorization Request Transaction Nonce" :
                        "Invalid Multisig Controller Address");
    }

    const safeAddress = authorizationRequest.transaction.asset.project.multisigController as Address;

    const safeTransactionNonce = authorizationRequest.transaction.safeTransactionNonce;

    const { safe, currentUser } = await validateSignatory(safeAddress);

    const rejectionTransaction = await safe.createRejectionTransaction(safeTransactionNonce);

    const rejectionHash = "";

    //Create a transaction on xata for the token
    const rejectAssetTransaction = await assetTransactionRepository().create({
        asset: authorizationRequest.transaction.asset.id,
        status: AssetTransactionStatus.Pending,
        type: AssetTransactionType.IssueToken,
        createdBy: currentUser.user.id,
        amount: authorizationRequest.transaction.amount,
        safeTransactionHash: rejectionHash,
        safeTransactionNonce: rejectionTransaction.data.nonce
    });

    //send an email to initiator
    const rejectionAuthorizationRequestId = getConcatenatedId(currentUser.user.id, rejectAssetTransaction.id);

    await authorizationRequestRepository().create(rejectionAuthorizationRequestId, {
        signer: currentUser.user.id,
        transaction: rejectAssetTransaction.id,
        status: AuthorizationRequestStatus.Pending
    });

    const projectId = authorizationRequest.transaction.asset.project.id;

    const projectName = authorizationRequest.transaction.asset.project.name;

    const assetName = authorizationRequest.transaction.asset.project.name;

    const link = `${process.env.HOST_LINK}/authorization?projectId=${projectId}&requestId=${authorizationRequest.id}`;

    const mailOptions = getSafeTxnRejectionMailOption(
        {
            email: currentUser.user.email,
            projectName: projectName,
            assetName: assetName,
            link
        });

    (await MailService.getTransporter()).sendMail(mailOptions, (error) => {
        if (error) {
            throw new Error("An Error occurred\nNo email sent!");
        }
    });
}