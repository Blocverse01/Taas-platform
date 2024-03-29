import { PaymasterMode } from "@biconomy/paymaster";
import { getSmartAccount } from "./smartAccount";
import { Address } from "viem";
import { Transaction } from "@biconomy/core-types";

const sponsorTransaction = async (transaction: Transaction) => {
  const biconomySmartAccount = await getSmartAccount();

  let userOp = await biconomySmartAccount.buildUserOp([transaction], {
    paymasterServiceData: {
      mode: PaymasterMode.SPONSORED,
      smartAccountInfo: {
        name: "BICONOMY",
        version: "2.0.0",
      }
    }
  });

  const userOpResponse = await biconomySmartAccount.sendUserOp(userOp);

  const { receipt: userOpReceipt } = await userOpResponse.wait(1);

  return userOpReceipt.transactionHash as Address;
};

export { sponsorTransaction };
