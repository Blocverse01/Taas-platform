import { ComponentProps } from "react"
import { ProjectDashboard } from "."
import { dummyTransactionData } from "./recentTransactions/demoData";

type GetAnalytics = ComponentProps<typeof ProjectDashboard>["getAnalytics"];

const getDummyProjectAnalytics: GetAnalytics = async (
  projectId: string
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        assets: {
          volume: 10,
          weeklyTrend: 4,
        },
        investment: {
          volume: 50000,
          weeklyTrend: 10,
        },
        recentTransactions: dummyTransactionData,
      });
    }, 3000);
  });
};

export { getDummyProjectAnalytics }