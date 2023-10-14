import type { Meta, StoryObj } from "@storybook/react";

import { TokenManagement } from "./tokenManagement";

const meta = {
  title: "Project/TokenManagement",
  component: TokenManagement,
  tags: ["autodocs"],
  args: {
    async issueToken(tokenAddress, destinationAddress, amount) {
      console.log(tokenAddress, destinationAddress, amount);
    },
    async getTokenInformation(tokenAddress) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            totalSupply: 100,
            assetHoldersCount: 10,
          });
        }, 3000);
      });
    },
    tokenAddress: "0x000000",
    tokenPrice: 100,
  },
} satisfies Meta<typeof TokenManagement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TokenManagement_: Story = {};
