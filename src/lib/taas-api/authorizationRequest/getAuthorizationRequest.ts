import { authorizationRequestRepository } from "@/utils/constants"
import { getSession } from "next-auth/react";

export const getAuthorizationRequest = async (authorizationRequestId: string) => {
    return await authorizationRequestRepository().read(authorizationRequestId);
}

export const getAllAuthorizationRequests = async (transactionId: string) => {
    await authorizationRequestRepository()
        .filter({ "transaction.id": transactionId })
        .getMany();
}

export const getAllMyAuthorizationRequests = async () => {
    const currentUser = await getSession();

    return await authorizationRequestRepository()
        .filter({ "signer.id": currentUser?.user.id })
        .getMany();
}