import type { Meta, StoryObj } from "@storybook/react";
import { ApiKeys } from "./apiKeys";

const meta = {
  title: "Dashboard/Integrations Page/API Keys",
  component: ApiKeys,
  tags: ["autodocs"],
  args: {
    apiKeys: [
      {
        project: {
          id: "project-1",
          name: "Eko Atlantic",
        },
        createdAt: new Date("2023-05-20").toISOString(),
        id: "api-key-1",
      },
      {
        project: {
          id: "project-2",
          name: "Plotpeer",
        },
        createdAt: new Date("2023-07-20").toISOString(),
        id: "api-key-2",
      },
      {
        project: {
          id: "project-3",
          name: "Bullion Van",
        },
        createdAt: new Date("2023-07-20").toISOString(),
        id: "api-key-3",
      },
    ],
    regenerateApiKey(projectId) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("pDVNHskiNZL/eZN4ZV/muA==");
        }, 5000);
      });
    },
    deleteApiKey(apiKeyId) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 5000);
      });
    },
  },
} satisfies Meta<typeof ApiKeys>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ApiKeys_: Story = {};
