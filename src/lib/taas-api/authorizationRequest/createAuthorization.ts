import { assetTransactionRepository, authorizationRequestRepository } from "@/utils/constants";
import { AssetTransactionStatus, AssetTransactionType, AuthorizationRequest as AuthorizationRequestStatus } from "@/utils/enums";
import { getConcatenatedId } from "@/utils/helperfunctions";

export const createAssetTransactionRequest = async (payload: any) => {
    await assetTransactionRepository().create({
        asset: payload.id,
        status: AssetTransactionStatus.Pending,
        type: AssetTransactionType.IssueToken,
        createdBy: payload.userId,
        amount: payload.amount,
        safeTransactionHash: payload.rejectionHash,
        safeTransactionNonce: payload.nonce
    });
}

export const createAuthorizationRequest = async (payload: any) => {
    const rejectionAuthorizationRequestId = getConcatenatedId(payload.userId, payload.assetTransactionId);

    await authorizationRequestRepository().create(rejectionAuthorizationRequestId, {
        signer: payload.userId,
        transaction: payload.assetTransactionId,
        status: AuthorizationRequestStatus.Pending
    });
}

