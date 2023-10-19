import { Meta, StoryObj } from "@storybook/react";
import { RecentTransactions } from ".";

const meta = {
  title: "Project/Recent Transactions",
  component: RecentTransactions,
  tags: ["autodocs"],
  args: {
    projectName: "Eko Hotel",
  },
} satisfies Meta<typeof RecentTransactions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
