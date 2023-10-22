import { CheckCircleIcon, CrossIcon } from "@/assets/icon";
import type { SafeMultisigConfirmationResponse } from "@safe-global/safe-core-sdk-types";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FC } from "react";
import toast, { CheckmarkIcon } from "react-hot-toast";
import type { Address } from "viem";

interface AuthorizationBreakdownProps {
  authorization: {
    actionTitle: string;
    assetAddress: Address;
    confirmationsRequired: number;
    confirmations: SafeMultisigConfirmationResponse[];
    initiator: Address;
    toUser?: Address;
    assetTokenValue?: string;
    createdAt: string;
    safeTxHash: Address;
    isExecuted: boolean;
  };
  assetDetails: {
    name: string;
    assetLink: string;
  };
  approveTransaction: (txHash: Address) => Promise<void>;
  executeTransaction: (txHash: Address) => Promise<void>;
  handleBack: () => void;
}

const AuthorizationBreakdown: FC<AuthorizationBreakdownProps> = ({
  authorization,
  assetDetails,
  approveTransaction,
  executeTransaction,
  handleBack,
}) => {
  const DATE_FORMAT = "dd MMM, yyyy";

  const currentUser = useSession();
  const currentUserWallet = currentUser.data?.user.walletAddress;

  const hasApproved =
    currentUser &&
    authorization.confirmations.some((confirmation) => confirmation.owner == currentUserWallet);

  const handleApproveTx = async () => {
    if (hasApproved) {
      toast.success("You have approved this transaction");
      return;
    }
    const toastId = toast.loading("Attaching your signature");
    try {
      await approveTransaction(authorization.safeTxHash);

      toast.dismiss(toastId);
      toast.success("Transaction Authorized");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Transaction Authorization failed");
    }
  };

  const handleExecuteTx = async () => {
    if (authorization.isExecuted) {
      toast.success("This transaction has been executed");
      return;
    }
    const toastId = toast.loading("Executing transaction");
    try {
      await executeTransaction(authorization.safeTxHash);

      toast.dismiss(toastId);
      toast.success("Transaction Executed");
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      toast.error("Transaction Execution failed");
    }
  };

  return (
    <div>
      <button type="button" onClick={handleBack} className="text-t-purple underline mb-5 w-fit">
        {"< See All Authorizations"}
      </button>
      <section className="flex flex-col gap-10">
        <section>
          <h3 className="text-2xl mb-2">{assetDetails.name}</h3>
          <p className="text-t-black/50">{authorization.actionTitle}</p>
        </section>
        <section>
          <h3 className="text-2xl mb-4">Transaction Details</h3>
          <div className="flex gap-10 items-center">
            <div className="bg-t-gray-2 py-4 md:py-6 px-6 md:px-8 rounded flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h3 className="text-t-black">Initiator</h3>
                <p className="text-t-gray-5 text-sm">{authorization.initiator}</p>
              </div>
              <div className="flex gap-14">
                {authorization.assetTokenValue && (
                  <div className="flex flex-col gap-3">
                    <h3 className="text-t-black">Amount of Assets</h3>
                    <p className="text-t-gray-5 text-sm">{authorization.assetTokenValue}</p>
                  </div>
                )}
                {authorization.toUser && (
                  <div className="flex flex-col gap-3">
                    <h3 className="text-t-black">To Wallet</h3>
                    <p className="text-t-gray-5 text-sm">{authorization.toUser}</p>
                  </div>
                )}
                <div className="flex flex-col gap-3">
                  <h3 className="text-t-black">Date Created</h3>
                  <p className="text-t-gray-5 text-sm">
                    {format(new Date(authorization.createdAt), DATE_FORMAT)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <button
                type="button"
                onClick={handleApproveTx}
                className="text-t-purple flex font-medium items-center gap-2"
              >
                <span>Authorize</span>
                <CheckCircleIcon />
              </button>
              <button className="flex font-medium items-center gap-2">
                <span>Reject</span>
                <span className="h-5 w-5 rounded-full flex items-center justify-center border border-y-t-black/70 border-x-t-black/70">
                  <CrossIcon />
                </span>
              </button>
            </div>
          </div>
        </section>
        <section>
          <h3 className="mb-3">
            Authorizations:{" "}
            <span className="text-t-purple">
              {authorization.confirmations?.length ?? 0}/{authorization.confirmationsRequired}
            </span>
          </h3>
          {authorization.confirmations && (
            <div className="flex-col flex gap-3">
              {authorization.confirmations.map((confirmation) => (
                <div key={confirmation.owner} className="flex items-center gap-2">
                  <CheckmarkIcon />
                  <span>{confirmation.owner == currentUserWallet ? "You" : `${confirmation.owner}`}</span>
                </div>
              ))}
            </div>
          )}
        </section>
        <section>
          <button
            type="button"
            onClick={handleExecuteTx}
            disabled={authorization.confirmations.length < authorization.confirmationsRequired}
            className="bg-t-purple py-[18px] rounded text-white px-[54px] disabled:opacity-60"
          >
            Execute Transaction
          </button>
        </section>
      </section>
    </div>
  );
};

export { AuthorizationBreakdown };
