import { Meta, StoryObj } from "@storybook/react";
import { LogoutDialog } from ".";
const meta = {
  title: "Project/Logout Dialog",
  component: LogoutDialog,
  tags: ["autodocs"],
  args: {
    logout: async () => { }
  }
} satisfies Meta<typeof LogoutDialog>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Logout_Dialog: Story = {};
