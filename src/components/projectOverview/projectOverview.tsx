"use client";
import { ComponentProps, FC } from "react";
import { ProjectCard } from "./projectCard";
import { GridListing } from "../gridlisting/gridListing";

type ProjectCardProps = ComponentProps<typeof ProjectCard>;

interface ProjectsOverviewProps {
  projects: Array<ProjectCardProps["project"]>;
}

const ProjectsOverview: FC<ProjectsOverviewProps> = ({ projects }) => {
  return (
    <GridListing
      items={projects}
      renderItem={(item) => <ProjectCard project={item} />}
    />
  );
};

export { ProjectsOverview };
