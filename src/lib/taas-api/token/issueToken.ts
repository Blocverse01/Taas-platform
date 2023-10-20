import { Address, TransactionReceipt, encodeFunctionData } from "viem";
import {
    getAccount,
    getPublicClient,
    getWalletClient,
} from "@/utils/web3/connection";
import { PLATFORM_ENTRY } from "@/utils/web3/abis";
import { utils } from "@/utils/web3/utils";
import { getContractAddress } from "@/utils/web3/contracts";
import { sponsorTransaction } from "@/lib/biconomy";
import { SPONSOR_TRANSACTION } from "@/utils/constants";

const CONTRACT_FUNCTION_NAME = "issueToken" as const;
interface TxResponse {
    status: TransactionReceipt["status"];
    txHash: Address;
}

const issueToken = async (
    tokenFactoryAddress: Address,
    tokenAddress: Address,
    destinationWallet: Address,
    amount: number
): Promise<TxResponse> => {
    const account = await getAccount();
    const publicClient = getPublicClient();
    const walletClient = getWalletClient();
    const platformEntryAddress = getContractAddress("PLATFORM_ENTRY");

    const functionArgs = [
        tokenFactoryAddress,
        tokenAddress,
        destinationWallet,
        utils.parseEther(`${amount}`),
        "0x00000000000000000",
    ] as const;

    if (SPONSOR_TRANSACTION) {
        const encodedData = encodeFunctionData({
            abi: PLATFORM_ENTRY,
            functionName: CONTRACT_FUNCTION_NAME,
            args: functionArgs,
        });

        const txHash = await sponsorTransaction({
            data: encodedData,
            to: platformEntryAddress,
        });

        const receipt = await publicClient.getTransactionReceipt({
            hash: txHash,
        });
        if (receipt.status === "reverted") throw new Error("Transaction failed");
        return {
            status: receipt.status,
            txHash,
        };
    }

    const { request } = await publicClient.simulateContract({
        account,
        address: platformEntryAddress,
        abi: PLATFORM_ENTRY,
        functionName: "issueToken",
        args: functionArgs,
    });

    const txHash = await walletClient.writeContract(request);

    const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
    });
    if (receipt.status === "reverted") throw new Error("Transaction failed");
    return { status: receipt.status, txHash };
};

export { issueToken };
