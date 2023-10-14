import type { Meta, StoryObj } from "@storybook/react";

import { RealEstateAssetDetails } from "./realEstateAssetDetails";

const meta = {
  title: "Project/RealEstateAssetDetails",
  component: RealEstateAssetDetails,
  tags: ["autodocs"],
  args: {
    asset: {
      name: "Deloitte Gardens",
      location: "Hyacinth Close, Ilford, Redbridge",
      description:
        "The property is a 2-bedroom leasehold flat located in the district of Ilford within the London Borough of Redbridge.",
      size: 2000,
      valuation: 500000,
    },
  },
} satisfies Meta<typeof RealEstateAssetDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RealEstateAssetDetails_: Story = {};
