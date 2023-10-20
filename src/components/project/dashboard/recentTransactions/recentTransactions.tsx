import React, { ComponentProps, FC } from "react";
import { TransactionsTemplate } from "./transactionsTemplate";

interface RecentTransactionsProps {
  transactions: ComponentProps<typeof TransactionsTemplate>["transactions"];
}

const RecentTransactions: FC<RecentTransactionsProps> = ({transactions}) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl text-t-black font-medium">
          Recent Transactions
        </h1>
        <p className="font-sm text-t-gray-11">View All</p>
      </div>
      <div className="mt-4">
        <TransactionsTemplate transactions={transactions} />
      </div>
    </div>
  );
};

export { RecentTransactions };
