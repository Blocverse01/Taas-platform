"use client";
import { Avatar, CaretIcon, Notification } from "@/assets/icon";
import { FC } from "react";

interface ProjectHeaderProps {
  projectName: string;
}

const ProjectHeader: FC<ProjectHeaderProps> = ({ projectName }) => {
  return (
    <header className="relative flex justify-between items-center px-10 pb-6 pt-12 capitalize ">
      <p className="flex text-[20px] font-medium items-center space-x-2">
        <span className="  text-t-gray-13  ">{projectName}</span>
        <CaretIcon />
        <span className="text-t-purple">Dashboard</span>
      </p>
      <div className="flex items-center space-x-2.5">
        <Avatar />
        <Notification />
      </div>
    </header>
  );
};

export { ProjectHeader };
