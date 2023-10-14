import type { Meta, StoryObj } from "@storybook/react";

import { AssetsPage } from "./assetsPage";

const meta = {
  title: "Project/Assets Page",
  component: AssetsPage,
  tags: ["autodocs"],
  args: {
    assetType: "real estate",
    assets: [
      {
        id: "asset-1",
        name: "Berberis Court",
        location: "Hyacinth Close, Ilford, Redbridge",
        displayImage:
          "https://ipfs.moralis.io:2053/ipfs/QmeMtpZPDQk9CJV2V7hnCMbG6DYuKkJjxRiH6Kmwja4tkE/demo-real-estate-asset-image.jpeg",
        tokenPrice: 100,
      },
      {
        id: "asset-2",
        name: "Berberis Court 2",
        location: "Hyacinth Close, Ilford, Redbridge",
        displayImage:
          "https://ipfs.moralis.io:2053/ipfs/QmeMtpZPDQk9CJV2V7hnCMbG6DYuKkJjxRiH6Kmwja4tkE/demo-real-estate-asset-image.jpeg",
        tokenPrice: 100,
      },
      {
        id: "asset-3",
        name: "Berberis Court 3",
        location: "Hyacinth Close, Ilford, Redbridge",
        displayImage:
          "https://ipfs.moralis.io:2053/ipfs/QmeMtpZPDQk9CJV2V7hnCMbG6DYuKkJjxRiH6Kmwja4tkE/demo-real-estate-asset-image.jpeg",
        tokenPrice: 100,
      },
      {
        id: "asset-3",
        name: "Berberis Court 3",
        location: "Hyacinth Close, Ilford, Redbridge",
        displayImage:
          "https://ipfs.moralis.io:2053/ipfs/QmeMtpZPDQk9CJV2V7hnCMbG6DYuKkJjxRiH6Kmwja4tkE/demo-real-estate-asset-image.jpeg",
        tokenPrice: 100,
      },
      {
        id: "asset-4",
        name: "Berberis Court 4",
        location: "Hyacinth Close, Ilford, Redbridge",
        displayImage:
          "https://ipfs.moralis.io:2053/ipfs/QmeMtpZPDQk9CJV2V7hnCMbG6DYuKkJjxRiH6Kmwja4tkE/demo-real-estate-asset-image.jpeg",
        tokenPrice: 100,
      },
    ],
  },
} satisfies Meta<typeof AssetsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AssetsPage_: Story = {};
