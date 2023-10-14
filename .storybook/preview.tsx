import React from "react";
import type { Preview } from "@storybook/react";
import "@/styles/globals.css";
import { aeonikFont } from "../src/font/setup";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={`${aeonikFont.variable} font-aeonik`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
