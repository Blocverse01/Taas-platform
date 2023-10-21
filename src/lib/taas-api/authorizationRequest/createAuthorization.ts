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
