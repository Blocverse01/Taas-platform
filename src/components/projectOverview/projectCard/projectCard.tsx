"use client";
import { Caret, House } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactElement } from "react";
import { formatDistance } from "date-fns";
import CardBg from "@/assets/project-card-bg.png";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    assetType: string;
    timeCreated: string;
    link: string;
  };
}

//  TODO: make SVG change color on hover

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const { name, assetType, timeCreated, link: projectLink } = project;
  return (
    <div className="bg-t-gray  text-t-purple duration-200 hover:scale-105 hover:bg-t-purple hover:text-white  w-full h-[181px]  rounded-[10px] border border-[#ECECEC] flex flex-col space-y-4  p-5 relative group">
      <Image
        className="absolute  scale-110   z-1 inset-0  group-hover:opacity-10"
        src={CardBg}
        alt="Image"
      />
      <Link href={projectLink} className="absolute z-[999] inset-0" />
      <div className="flex z-10 items-center justify-between">
        <div className="group-hover:text-white">
          <House />
        </div>
        <p className="  text-[12px] font-medium text-t-purple2 capitalize  bg-t-purple3 duration-200 group-hover:bg-white  px-4 py-1 rounded-full  ">
          {assetType}
        </p>
      </div>
      <div className="flex z-10 items-center justify-between">
        <p className=" text-[20px] text-t-purple4 duration-200 group-hover:text-white truncate max-w-[165px] ">
          {name}
        </p>
        <Caret />
      </div>
      <div className="h-[2px] w-full z-10 bg-[#DADADA]"></div>
      <p className="z-10 text-[12px] ">
        Created{" "}
        {formatDistance(new Date(timeCreated), new Date(), {
          addSuffix: true,
        })}
      </p>
    </div>
  );
};

export { ProjectCard };
