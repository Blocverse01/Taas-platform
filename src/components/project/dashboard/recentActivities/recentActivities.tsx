import React, { ComponentProps, FC } from "react";
import { ActivitiesTemplate } from "./activitiesTemplate";

interface RecentActivitiesProps {
  activities: ComponentProps<typeof ActivitiesTemplate>["activities"];
}

const RecentActivities: FC<RecentActivitiesProps> = ({ activities }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl text-t-black font-medium">Recent Activities</h1>
        <p className="font-sm  text-t-purple font-medium ">View All</p>
      </div>
      <div className="mt-4">
        <ActivitiesTemplate activities={activities} />
      </div>
    </div>
  );
};

export { RecentActivities };
