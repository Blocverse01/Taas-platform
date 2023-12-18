import { ArrowRight } from "@/assets/icon";
import React, { FC } from "react";
import { format } from "date-fns";

const tableHeaders = ["Activity", "Category", "Date", "Review"];

interface ActivityLog {
  id: string;
  title: string;
  ctaText: string;
  ctaLink: string;
  category: string;
  createdAt: Date;
}

interface ActivitiesTemplateProps {
  activities: ActivityLog[];
}

const ActivitiesTemplate: FC<ActivitiesTemplateProps> = ({ activities }) => {

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
              <p className=" ">{item.title}</p>
            </td>
            <td className="w-[100px] text-t-gray-4">
              <p className=" w-fit ">{item.category}</p>
            </td>
            <td className="w-[400px]">{format(new Date(item.createdAt), "dd/MM/yy")}</td>
            <td>
              <a
                href={item.ctaLink}
                target="_blank"
                rel="noopener"
                className=" w-fit border flex items-center gap-2 text-sm text-t-gray-3 rounded-full border-t-gray-8 p-2"
              >
                {item.ctaText} <ArrowRight />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { ActivitiesTemplate };
