import { ArrowRight } from "@/assets/icon";
import React, { FC } from "react";

interface ActivitiesProps {
  activities: {
    id: number;
    activity: string;
    category: string;
    date: string;
    review: string;
  }[];
}

const tableHeaders = ["Activity", "Category", "Date", "Review"];

const ActivitiesTemplate: FC<ActivitiesProps> = ({ activities }) => {
  const recentActivities = activities.slice(0, 4);

  return (
    <table className="table-fixed border-separate border-spacing-y-12">
      <thead>
        <tr className="text-t-gray-4">
          {tableHeaders.map((header) => (
            <th
              key={header}
              className="w-[400px] pb-1.5 text-t-black/70  text-left !font-normal"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {recentActivities.map((item) => (
          <tr className="text-t-black" key={item.id}>
            <td className="w-[700px] ">
              <p className=" ">{item.activity}</p>
            </td>
            <td className="w-[100px] text-t-gray-4">
              <p className=" w-fit ">{item.category}</p>
            </td>
            <td className="w-[400px]">{item.date}</td>
            <td>
              <a
                href=""
                className=" w-fit border flex items-center gap-2 text-sm text-t-gray-3 rounded-full border-t-gray-8 p-2"
              >
                {item.review} <ArrowRight />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { ActivitiesTemplate };
