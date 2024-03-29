import { proposeTransaction } from "@/data/adapters/browser/safe/transactions";
import { validateSignatory } from "@/data/adapters/browser/safe/validateSafeSigner";
import { ISSUE_TOKEN_CONTRACT_FUNCTION_NAME, SPONSOR_TRANSACTION } from "@/resources/constants";
import { PLATFORM_ENTRY } from "@/resources/utils/web3/abis";
import { getContractAddress } from "@/resources/utils/web3/contracts";
import { utils } from "@/resources/utils/web3/utils";
import { AddressZero } from "@biconomy/common";
import { OperationType, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { Address, encodeFunctionData } from "viem";
import { sendUserOperation } from "../../alchemy/userOperation";
import { getAccount, getPublicClient, getWalletClient } from "@/resources/utils/web3/connection";

interface IssueTokenPayload {
    tokenFactory: Address;
    tokenAddress: Address;
    destinationWallet: Address;
    amount: number;
}

const USE_SAFE_ACCOUNT = false;

export const createIssueTokenAssetTransaction = async (
    tokenFactoryAdmin: Address,
    payload: IssueTokenPayload) => {
    const { tokenFactory, tokenAddress, destinationWallet, amount } = payload;

    const platformEntryAddress = getContractAddress("PLATFORM_ENTRY");

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

    if (USE_SAFE_ACCOUNT) {
        return await createTransactionWithSafe(encodedData, platformEntryAddress, tokenFactoryAdmin)
    }

    const txHash = await createTransactionWithOwnerAccount(encodedData, platformEntryAddress, functionArgs);

    return {
        txHash,
        actor: tokenFactoryAdmin
    }
}


const createTransactionWithOwnerAccount = async (data: Address, target: Address, functionArgs: readonly [Address, Address, Address, bigint, typeof AddressZero]) => {
    if (SPONSOR_TRANSACTION) {
        const txHash = sendUserOperation({
            calldata: data,
            target
        });

        return txHash;
    }

    const account = await getAccount();
    const publicClient = getPublicClient();
    const walletClient = getWalletClient();

    const { request } = await publicClient.simulateContract({
        account,
        address: target,
        abi: PLATFORM_ENTRY,
        functionName: ISSUE_TOKEN_CONTRACT_FUNCTION_NAME,
        args: functionArgs,
    });

    const txHash = await walletClient.writeContract(request);

    return txHash;
}

const createTransactionWithSafe = async (data: Address, target: Address, tokenFactoryAdmin: Address) => {
    const { currentUser, safe } = await validateSignatory(tokenFactoryAdmin);

    const safeTransactionData: SafeTransactionDataPartial = {
        data,
        operation: OperationType.Call,
        to: target,
        value: "0"
    };

    const { txHash, nonce } = await proposeTransaction(
        safeTransactionData,
        safe,
        tokenFactoryAdmin,
        currentUser.user.walletAddress
    );

    return { txHash, nonce, actor: currentUser.user.walletAddress };
}