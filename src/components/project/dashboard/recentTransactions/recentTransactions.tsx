import React from "react";
import { TransactionTemplate } from "./transactionTemplate";
import { TransactionData } from "./demodata";

const RecentTransactions = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className=" text-xl font-medium ">Recent Transactions</h1>
        <p className="font-sm text-t-gray-13">View All</p>
      </div>
      <div className="mt-4">
        <TransactionTemplate transaction={TransactionData} />
      </div>
    </div>
  );
};

export { RecentTransactions };
