"use client";

import { FC } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { Avatar, Notification } from "../icons";

const Header: FC = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <header className="relative flex justify-between items-center p-6 pt-12 capitalize border-b-[1px] border-t-grey-3">
      <p>{segment ?? "overview"}</p>
      <div className="flex space-x-2.5">
        <Avatar />
        <Notification />
      </div>
    </header>
  );
};

export { Header };
