import type { Meta, StoryObj } from "@storybook/react";
import { Settings } from "./settings";

const meta = {
  title: "Project/Settings Page",
  component: Settings,
  tags: ["autodocs"],
} satisfies Meta<typeof Settings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Settings_: Story = {};
