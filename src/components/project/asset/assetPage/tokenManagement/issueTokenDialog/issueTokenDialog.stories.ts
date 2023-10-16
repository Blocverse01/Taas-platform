import type { Meta, StoryObj } from "@storybook/react";

import { IssueTokenDialog } from "./issueTokenDialog";

const meta = {
  title: "Project/IssueTokenDialog",
  component: IssueTokenDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    async handleIssueToken(destinationAddress, amount) {
      console.log(destinationAddress, amount);
    },
  },
} satisfies Meta<typeof IssueTokenDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IssueTokenDialog_: Story = {};
