import { Address } from "viem"
import { AddOwnerTxParams, RemoveOwnerTxParams } from "@safe-global/protocol-kit";
import { SafeTransaction } from "@safe-global/safe-core-sdk-types";
import { validateSignatory } from "./validateSafeSigner";

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


//TODO : BATCH REMOVAL
//TODO : BATCH ADDITION