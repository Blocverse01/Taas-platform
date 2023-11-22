import { proposeTransaction } from "@/lib/safe/transactions";
import { validateSignatory } from "@/lib/safe/validateSafeSigner";
import { ISSUE_TOKEN_CONTRACT_FUNCTION_NAME, assetPropertyRepository } from "@/utils/constants";
import { PLATFORM_ENTRY } from "@/utils/web3/abis";
import { getContractAddress } from "@/utils/web3/contracts";
import { utils } from "@/utils/web3/utils";
import { AddressZero } from "@biconomy/common";
import { OperationType, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { Address, encodeFunctionData } from "viem";
import { storeProjectActivityLogItem } from "../activityLog/createActivityLog";
import { ActivityLogAssetSubCategory, ActivityLogCategory, ActivityLogProjectSubCategory } from "../activityLog/types";
import { createActivityLogTitle } from "../activityLog/activityLogUtils";
import { getTransactionExplorerUrl } from "@/utils/web3/connection";
import { getAsset } from "./getTokenInformation";

interface IssueTokenPayload {
    tokenFactory: Address;
    tokenAddress: Address;
    destinationWallet: Address;
    amount: number;
}

export const createIssueTokenAssetTransaction = async (
    multisigController: Address,
    payload: IssueTokenPayload) => {
    const { currentUser, safe } = await validateSignatory(multisigController);

    const { tokenFactory, tokenAddress, destinationWallet, amount } = payload;

    const platformEntry = getContractAddress("PLATFORM_ENTRY");

    const functionArgs = [
        tokenFactory,
        tokenAddress,
        destinationWallet,
        utils.parseEther(`${amount}`),
        AddressZero,
    ] as const;

    const encodedData = encodeFunctionData({
        abi: PLATFORM_ENTRY,
        functionName: ISSUE_TOKEN_CONTRACT_FUNCTION_NAME,
        args: functionArgs
    });

    // propose transaction on safe
    const safeTransactionData: SafeTransactionDataPartial = {
        operation: OperationType.Call,
        data: encodedData,
        to: platformEntry,
        value: "0"
    };

    const { txHash, nonce } = await proposeTransaction(
        safeTransactionData,
        safe,
        multisigController,
        currentUser.user.walletAddress
    );

    //get token using tokenAddress
    const token = await getAsset(tokenAddress);

    await storeProjectActivityLogItem(token.project?.id as string, {
        title: createActivityLogTitle(ActivityLogAssetSubCategory["issueTokenTxn"], ActivityLogCategory["asset"], token.name),
        category: ActivityLogCategory["asset"],
        ctaLink: getTransactionExplorerUrl(txHash),
        ctaText: "View Transaction",
        subCategory: ActivityLogAssetSubCategory["issueTokenTxn"],
        actor: currentUser.user.walletAddress
    });

    return { txHash, nonce };
}