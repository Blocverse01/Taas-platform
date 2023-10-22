import { ComponentProps, FC } from "react";
import { AuthorizationCard } from "./authorizationCard";

type AuthorizationCardProps = ComponentProps<typeof AuthorizationCard>;

interface PendingAuthorizationsProps {
  safeTransactions: Array<AuthorizationCardProps["safeTransaction"]>;
  parseTransaction: AuthorizationCardProps["parseAuthorization"];
  getAssetDetails: AuthorizationCardProps["getAssetDetails"];
  selectAuthorization: AuthorizationCardProps["selectAuthorization"];
}

const PendingAuthorizations: FC<PendingAuthorizationsProps> = ({
  safeTransactions,
  parseTransaction,
  getAssetDetails,
  selectAuthorization,
}) => {
  return (
    <table className="table-fixed border-separate border-spacing-y-8">
      <thead>
        <tr className="text-left text-t-black/70">
          <th className="w-[300px] px-6 font-medium">Action Title</th>
          <th className="w-[300px] font-medium">Asset</th>
          <th className="w-[300px] font-medium">Initiator</th>
        </tr>
      </thead>
      <tbody className="text-t-black text-sm">
        {safeTransactions.map((safeTx) => (
          <AuthorizationCard
            key={safeTx.nonce}
            parseAuthorization={parseTransaction}
            safeTransaction={safeTx}
            getAssetDetails={getAssetDetails}
            selectAuthorization={selectAuthorization}
          />
        ))}
      </tbody>
      {safeTransactions.length === 0 && (
        <div className="text-center text-sm text-t-black/70">No items to display</div>
      )}
    </table>
  );
};

export { PendingAuthorizations };
