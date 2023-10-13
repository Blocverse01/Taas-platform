import type { Meta, StoryObj } from "@storybook/react";

import { RealEstateAssetCard } from ".";

const meta = {
  title: "Project/RealEstateAssetCard",
  component: RealEstateAssetCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    asset: {
      name: "Berberis Court",
      location: "Hyacinth Close, Ilford, Redbridge",
      displayImage: "https://ipfs.moralis.io:2053/ipfs/QmeMtpZPDQk9CJV2V7hnCMbG6DYuKkJjxRiH6Kmwja4tkE/demo-real-estate-asset-image.jpeg",
      tokenPrice: 100
    }
  },
} satisfies Meta<typeof RealEstateAssetCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RealEstateAssetCard_: Story = {};
