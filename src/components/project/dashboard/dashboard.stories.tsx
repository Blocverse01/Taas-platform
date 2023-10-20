import { Meta, StoryObj } from "@storybook/react";
import { ProjectDashboard } from "./dashboard";
import { getDummyProjectAnalytics } from "./demoData";

const meta = {
  title: "Project/Dashboard",
  component: ProjectDashboard,
  tags: ["autodocs"],
  args: {
    projectId: "dummy-project",
    getAnalytics(projectId) {
      return getDummyProjectAnalytics(projectId);
    },
  },
} satisfies Meta<typeof ProjectDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {};
