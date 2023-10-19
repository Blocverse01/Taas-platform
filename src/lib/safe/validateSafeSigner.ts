import Safe from "@safe-global/protocol-kit";
import { Address } from "viem";
import { getSafe } from ".";
import { getSession } from "next-auth/react";

let safeInstance: Safe | undefined = undefined;

export const validateSignatory = async (safeAddress: Address) => {

    const safe = safeInstance ??= await getSafe(safeAddress);

    const currentUser = await getSession();

    if (!currentUser) {
        throw new Error("Unauthorized user");
    }

    const currentUserWalletAddress = currentUser.user.walletAddress;

    const isOwner = await safe.isOwner(currentUserWalletAddress);

    if (!isOwner) {
        throw new Error("Sender is not a signatory");
    }

    return { currentUser, safe };
}