import type { Meta, StoryObj } from "@storybook/react";
import { ApiIntegrations } from "./apiIntegrations";

const meta = {
  title: "Dashboard/Integrations Page",
  component: ApiIntegrations,
  tags: ["autodocs"],
  args: {
    generateApiKey(projectId) {
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
    projects: [
      {
        id: "project-3",
        name: "Bullion Van",
      },
      {
        id: "project-2",
        name: "Plotpeer",
      },
      {
        id: "project-3",
        name: "Eko Atlantic",
      },
    ],
  },
} satisfies Meta<typeof ApiIntegrations>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAPIKeys: Story = {
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
  },
};

export const WithoutAPIKeys: Story = {
  args: {
    apiKeys: [],
  },
};
