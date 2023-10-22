import { Meta, StoryObj } from "@storybook/react";
import { ProjectSidebar } from ".";

const meta = {
  title: "Project/Project Sidebar",
  component: ProjectSidebar,
  tags: ["autodocs"],
  args: {
    projectId: "1123433",
  },
} satisfies Meta<typeof ProjectSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
