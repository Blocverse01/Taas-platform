import type { Meta, StoryObj } from "@storybook/react";

import { DocumentsManager } from "./documentsManager";

const meta = {
  title: "Project/DocumentsManager",
  component: DocumentsManager,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
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
} satisfies Meta<typeof DocumentsManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DocumentsManager_: Story = {};
