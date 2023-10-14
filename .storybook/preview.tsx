import React, { useEffect, useRef } from "react";
import type { Preview } from "@storybook/react";
import "@/styles/globals.css";
import { aeonikFont } from "../src/font/setup";
import "react-loading-skeleton/dist/skeleton.css";
import { useSetModalParent } from "../src/lib/zustand/modalSlice";

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
    (Story) => {
      const modalRef = useRef<HTMLDivElement | null>(null);
      const setModalParent = useSetModalParent();

      useEffect(() => {
        if (modalRef.current) {
          setModalParent(modalRef.current);
        }
      }, [setModalParent]);
      return (
        <div ref={modalRef} className={`${aeonikFont.variable} font-aeonik`}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
