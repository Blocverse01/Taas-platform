import { Meta, StoryObj } from "@storybook/react";
import { ProjectDashboard } from "./dashboard";

const meta = {
  title: "Project/Dashboard",
  component: ProjectDashboard,
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {};
