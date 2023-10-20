import React, { FC } from "react";

interface TransactionsProps {
  transactions: {
    name: string;
    id: string;
    tokensBought: string;
    amount: string;
  }[];
}

const tableHeaders = ["Customer", "Txn ID", "Tokens Bought", "Amount Paid"];

const TransactionsTemplate: FC<TransactionsProps> = ({ transactions }) => {
  return (
    <table className="table-fixed border-separate border-spacing-y-5">
      <thead>
        <tr className="text-t-gray-4">
          {tableHeaders.map((header) => (
            <th
              key={header}
              className="w-[400px] pb-1.5 border-t-gray-4 border-b text-left !font-normal"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {transactions.map((item) => (
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

export { TransactionsTemplate };
