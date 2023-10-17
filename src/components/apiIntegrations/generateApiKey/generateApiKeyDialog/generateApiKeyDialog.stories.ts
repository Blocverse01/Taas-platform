import type { Meta, StoryObj } from "@storybook/react";
import { GenerateApiKeyDialog } from "./generateApiKeyDialog";

const meta = {
  title: "Dashboard/Integrations Page/Generate API Key Dialog",
  component: GenerateApiKeyDialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    projects: [
      { id: "project-1", name: "Eko Atlantic" },
      { id: "project-2", name: "Plotpeer" },
    ],
    generateApiKey(projectId) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("pDVNHskiNZL/eZN4ZV/muA==");
        }, 5000);
      });
    },
  },
} satisfies Meta<typeof GenerateApiKeyDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GenerateApiKeyDialog_: Story = {};
