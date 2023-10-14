import type { Meta, StoryObj } from "@storybook/react";

import { DangerZone } from "./dangerZone";

const meta = {
  title: "Project/DangerZone",
  component: DangerZone,
  tags: ["autodocs"],
  args: {
    async delistAsset(assetId) {},
    async disableToken(tokenAddress) {},
    assetType: "real estate",
    assetId: "asset-1",
    tokenAddress: "0x000000",
  },
} satisfies Meta<typeof DangerZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DangerZone_: Story = {};
