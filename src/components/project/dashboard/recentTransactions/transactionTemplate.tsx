import React, { FC } from "react";

interface TransactionProps {
  transaction: {
    name: string;
    id: string;
    tokensBought: string;
    amount: string;
  }[];
}

const TransactionTemplate: FC<TransactionProps> = ({ transaction }) => {
  return (
    <table className="table-fixed border-separate border-spacing-y-4">
      <thead className="border-2  border-b-t-gray-4">
        <tr className="text-t-gray-4">
          <th className="w-[400px]  text-left">Customer</th>
          <th className="w-[400px]   text-left">Txn ID</th>
          <th className="w-[400px]  text-left">Tokens Bought</th>
          <th className="w-[400px]  text-left">Amount Paid</th>
        </tr>
      </thead>
      <tbody>
        {transaction.map((item) => (
          <tr className="text-t-black" key={item.id}>
            <td className="w-[400px] ">
              <p className="max-w-[132px] truncate">{item.name}</p>
            </td>
            <td className="w-[400px] text-t-gray-4    ">
              <p className="border w-fit rounded  px-2 py-1 border-t-gray-4">
                {" "}
                #{item.id}
              </p>
            </td>
            <td className="w-[400px]">{item.tokensBought}</td>
            <td className="w-[400px]">${item.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { TransactionTemplate };
