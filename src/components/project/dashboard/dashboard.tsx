import React from "react";
import { DataCard } from "./dataCard";
import { Investment, Asset } from "./demoData";
import { RecentTransactions } from "./recentTransactions";

const ProjectDashboard = () => {
  return (
    <div>
      <div className="flex space-x-16">
        <DataCard type="investments" data={Investment} />
        <DataCard type="assets" data={Asset} />
      </div>

      <div className="mt-28">
        <RecentTransactions />
      </div>
    </div>
  );
};

export { ProjectDashboard };
