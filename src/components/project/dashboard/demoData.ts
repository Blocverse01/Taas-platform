import { ComponentProps } from "react";
import { ProjectDashboard } from ".";
import { dummyTransactionData } from "./recentActivities/demoData";

type GetAnalytics = ComponentProps<typeof ProjectDashboard>["getAnalytics"];

const getDummyProjectAnalytics: GetAnalytics = async (projectId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        assets: {
          volume: 12,
          weeklyTrend: 4,
        },
        treasuryBalance: {
          volume: 1000,
          weeklyTrend: 10,
        },
        recentActivities: dummyTransactionData,
      });
    }, 3000);
  });
};

export { getDummyProjectAnalytics };
