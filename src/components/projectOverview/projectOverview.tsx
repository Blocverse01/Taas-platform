import { ComponentProps, FC } from "react";
import { ProjectCard } from "./projectCard";
import { GridListing } from "../gridListing";

type ProjectCardProps = ComponentProps<typeof ProjectCard>;

interface ProjectsOverviewProps {
  projects: Array<ProjectCardProps["project"]>;
}

const ProjectsOverview: FC<ProjectsOverviewProps> = ({ projects }) => {
  return (
    <GridListing<(typeof projects)[number]>
      items={projects}
      renderItem={(item) => <ProjectCard project={item} />}
    />
  );
};

export { ProjectsOverview };
