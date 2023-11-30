import { Meta, StoryObj } from "@storybook/react";
import { RecentActivities } from ".";
import { dummyTransactionData } from "./demoData";

const meta = {
  title: "Project/Recent Activities",
  component: RecentActivities,
  tags: ["autodocs"],
  args: {
    activities: dummyTransactionData,
  },
} satisfies Meta<typeof RecentActivities>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
