 import type { Meta, StoryObj } from "@storybook/react";

import { CreateRealEstateAssetForm } from "./form";

const meta = {
  title: "Project/Asset/Create Real Estate Asset Form",
  component: CreateRealEstateAssetForm,
  tags: ["autodocs"],
  args: {
    backLink: "/assets",
    handleCreateAsset(values) {
      console.log(values)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 3000)
      })
    },
  },
} satisfies Meta<typeof CreateRealEstateAssetForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateRealEstateAssetForm_: Story = {};
