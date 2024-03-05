import type { Meta, StoryObj } from "@storybook/react";

import { CreateAsset } from "./createAsset"

const meta = {
  title: "Project/Asset/Create Asset",
  component: CreateAsset,
  tags: ["autodocs"],
  args: {
    projectId: "sample-project-id",
    assetType: "real estate",
    projectTokenFactory: "0x0",
    projectName: "Sample Project"
  },
} satisfies Meta<typeof CreateAsset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateAsset_: Story = {};
