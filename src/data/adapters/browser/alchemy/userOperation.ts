import { Address } from "viem";
import { getSmartAccountClient } from "./modularSmartAccount";

const sendUserOperation = async (operationData: { calldata: Address, target: Address }) => {
    const { calldata, target } = operationData;

    const smartAccountClient = await getSmartAccountClient();

    if (!smartAccountClient.account) {
        throw new Error('SmartAccountClient account missing')
    }

    const userOperation = await smartAccountClient.sendUserOperation({
        uo: {
            target: target,
            data: calldata,
        },
        account: smartAccountClient.account
    });

    const txHash = await smartAccountClient.waitForUserOperationTransaction(userOperation);

    return txHash;
}

export { sendUserOperation }