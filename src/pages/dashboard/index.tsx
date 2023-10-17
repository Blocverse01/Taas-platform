import type { NextPageWithLayout } from "../_app";
import Link from "next/link";
import { ComponentProps, ReactElement } from "react";

import { ProjectsOverview } from "@/components/projectOverview";
import { demoProjects } from "@/components/projectOverview/projectDemoData";

import DashboardLayout from "@/components/layout/dashboardLayout";
import { Plus } from "@/assets/icon";

type Projects = ComponentProps<typeof ProjectsOverview>["projects"];

const DashboardPage: NextPageWithLayout = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="font-medium text-t-purple4">All Projects</p>
        <Link
          href={"/projects/create-project"}
          className="px-3 py-4 rounded flex items-center  text-white  w-max bg-t-purple"
        >
          <Plus width="16" height="16" />
          <span className="ml-2">Create new project</span>
        </Link>
      </div>
      <ProjectsOverview projects={demoProjects} />
    </div>
  );
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardPage;
