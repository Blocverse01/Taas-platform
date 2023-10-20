import { Caret, House } from "@/assets/icon";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { formatDistance } from "date-fns";
import CardBg from "@/assets/project-card-bg.png";
import { TAAS_PURPLE } from "tailwind.config";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    assetType: AssetType;
    createdAt: string;
  };
}

const WHITE_COLOR = "#FFFFFF";

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const PROJECT_LINK = `/dashboard/projects/${project.id}`;

  const { name, assetType, createdAt } = project;
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className="bg-t-gray text-t-purple duration-200 hover:scale-105 hover:bg-t-purple hover:text-white w-full h-full rounded-xl border border-t-gray-12 flex flex-col justify-center gap-5 py-[17px] px-[22px] relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 z-1">
        <div className="relative w-full h-full">
          <Image
            className="object-cover object-bottom group-hover:opacity-10"
            src={CardBg}
            alt="Image"
            fill
          />
        </div>
      </div>
      <Link href={PROJECT_LINK} className="absolute z-[999] inset-0" />
      <div className="flex z-10 items-center justify-between">
        <div className="group-hover:text-white">
          <House fill={isHovered ? WHITE_COLOR : TAAS_PURPLE} />
        </div>
        <p className="text-sm font-medium text-t-purple group-hover:text-t-purple/60 capitalize bg-t-purple/[0.15] duration-200 group-hover:bg-white px-4 py-1 rounded-full">
          {assetType}
        </p>
      </div>
      <div className="flex z-10 items-center justify-between">
        <p className="text-xl text-t-black duration-200 group-hover:text-white line-clamp-2 max-w-[168px]">
          {name}
        </p>
        <Caret fill={isHovered ? WHITE_COLOR : TAAS_PURPLE} />
      </div>
      <div className="h-[1.1px] w-full z-10 bg-t-gray-13"></div>
      <p className="z-10 text-xs text-t-black group-hover:text-white">
        Created{" "}
        {formatDistance(new Date(createdAt), new Date(), {
          addSuffix: true,
        })}
      </p>
    </div>
  );
};

export { ProjectCard };
