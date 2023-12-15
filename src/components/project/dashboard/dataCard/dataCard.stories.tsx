import { Meta, StoryObj } from "@storybook/react";
import { DataCard } from ".";

const meta = {
  title: "Project/Data Card",
  component: DataCard,
  tags: ["autodocs"],
  args: {
    title: "Treasury Balance",
    value: "$1000.00",
    weeklyTrend: 4,
  },
} satisfies Meta<typeof DataCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InvestmentCard: Story = {};

export const AssetsCard: Story = {
  args: {
    title: "Total Assets",
    value: "10",
    weeklyTrend: 4,
  },
};
