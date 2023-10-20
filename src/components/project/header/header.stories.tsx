import { Meta, StoryObj } from "@storybook/react";
import { ProjectHeader } from ".";

const meta = {
  title: "Project/Project Header",
  component: ProjectHeader,
  tags: ["autodocs"],
  args: {
    breadcrumbs: ["Sample Project", "Assets"],
  },
} satisfies Meta<typeof ProjectHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
