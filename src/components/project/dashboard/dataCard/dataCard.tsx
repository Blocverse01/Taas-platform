import { ArrowDown, ArrowRight } from "@/assets/icon";
import React, { FC } from "react";

type DataCardProps = {
  title: string;
  value: string;
  weeklyTrend: number;
};

const DataCard: FC<DataCardProps> = ({ title, value, weeklyTrend }) => {
  return (
    <div className="bg-t-gray-10 flex flex-col space-y-4 rounded-xl w-[300px] text-t-black/70 py-7 px-5">
      <div className="flex justify-between items-center">
        <p className="text-sm">{title}</p>
        <ArrowRight />
      </div>

      <p className="text-[32px] text-t-black font-medium">{value}</p>

      <div className="flex items-center space-x-2">
        <ArrowDown />
        <p className="text-sm">{weeklyTrend}% from last week</p>
      </div>
    </div>
  );
};

export { DataCard };
