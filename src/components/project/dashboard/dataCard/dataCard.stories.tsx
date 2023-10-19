import { Meta, StoryObj } from "@storybook/react";
import { DataCard } from ".";

const meta = {
  title: "Project/Data Card",
  component: DataCard,
  tags: ["autodocs"],
  args: {
    type: "investments",
    data: {
      amount: "30.12",
    },
  },
} satisfies Meta<typeof DataCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InvestmentCard: Story = {};

export const AssetsCard: Story = {
  args: {
    type: "assets",
    data: {
      amount: "10",
    },
  },
};
