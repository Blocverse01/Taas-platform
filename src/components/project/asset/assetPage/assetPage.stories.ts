import type { Meta, StoryObj } from "@storybook/react";

import { AssetPage } from "./assetPage";

const meta = {
  title: "Project/Asset Page",
  component: AssetPage,
  tags: ["autodocs"],
  args: {
    assetType: "real estate",
    asset: {
      id: "asset-1",
      name: "Berberis Court",
      location: "Hyacinth Close, Ilford, Redbridge",
      tokenPrice: 100,
      description:
        "The property is a 2-bedroom leasehold flat located in the district of Ilford within the London Borough of Redbridge.",
      size: 2000,
      valuation: 500000,
      tokenAddress: "0x000000",
      documents: [
        {
          label: "Land Document",
          fileURI:
            "https://ipfs.moralis.io:2053/ipfs/QmeMtpZPDQk9CJV2V7hnCMbG6DYuKkJjxRiH6Kmwja4tkE/demo-real-estate-asset-image.jpeg",
          id: "document-1",
          fileSize: 200000,
        },
        {
          label: "Registry Agreeement",
          fileURI:
            "https://ipfs.moralis.io:2053/ipfs/QmeMtpZPDQk9CJV2V7hnCMbG6DYuKkJjxRiH6Kmwja4tkE/demo-real-estate-asset-image.jpeg",
          id: "document-2",
          fileSize: 300000,
        },
        {
          label: "Sample Document",
          fileURI:
            "https://ipfs.moralis.io:2053/ipfs/QmeMtpZPDQk9CJV2V7hnCMbG6DYuKkJjxRiH6Kmwja4tkE/demo-real-estate-asset-image.jpeg",
          id: "document-3",
          fileSize: 210000,
        },
      ],
    },
  },
} satisfies Meta<typeof AssetPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AssetPage_: Story = {};
