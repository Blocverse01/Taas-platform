import { Meta, StoryObj } from "@storybook/react";
import { RecentTransactions } from ".";
import { dummyTransactionData } from "./demoData";

const meta = {
  title: "Project/Recent Transactions",
  component: RecentTransactions,
  tags: ["autodocs"],
  args: {
    transactions: dummyTransactionData,
  },
} satisfies Meta<typeof RecentTransactions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
