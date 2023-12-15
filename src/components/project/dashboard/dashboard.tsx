import React, { ComponentProps, FC } from "react";
import { DataCard } from "./dataCard";
import { RecentActivities } from "./recentActivities";
import useSWR from "node_modules/swr/core/dist/index.mjs";
import Skeleton from "react-loading-skeleton";
import { ReloadPage } from "@/components/reloadPage";

interface ProjectAnalytics {
  treasuryBalance: {
    amount: number;
    weeklyTrend: number;
  };
  assets: {
    volume: number;
    weeklyTrend: number;
  };
  recentActivities: ComponentProps<typeof RecentActivities>["activities"];
}

interface ProjectDashboardProps {
  projectId: string;
  getAnalytics: (projectId: string) => Promise<ProjectAnalytics>;
}

const ProjectDashboard: FC<ProjectDashboardProps> = ({
  getAnalytics,
  projectId,
}) => {
  const key = `projects/${projectId}`;
  const {
    data: projectAnalytics,
    error,
    isLoading,
  } = useSWR(key, () => getAnalytics(projectId));

  if (error) return <ReloadPage />;

  return (
    <div>
      <div className="flex space-x-16">
        {projectAnalytics && (
          <>
            <DataCard
              title="Treasury Balance"
              value={"$" + projectAnalytics.treasuryBalance.amount.toFixed(2)}
              weeklyTrend={projectAnalytics.treasuryBalance.weeklyTrend}
            />
            <DataCard
              title="Total Assets"
              value={projectAnalytics.assets.volume.toString()}
              weeklyTrend={projectAnalytics.assets.weeklyTrend}
            />
          </>
        )}
        {isLoading &&
          [1, 2].map((value) => (
            <Skeleton key={value} width={250} height={145} />
          ))}
      </div>

      <div className="mt-28">
        {projectAnalytics && (
          <RecentActivities activities={projectAnalytics.recentActivities} />
        )}
        {isLoading && (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((value) => (
              <Skeleton key={value} height={60} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { ProjectDashboard };
