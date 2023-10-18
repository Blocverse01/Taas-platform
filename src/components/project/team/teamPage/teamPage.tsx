import { SearchIcon } from "@/assets/icon";
import React from "react";
import { TeamMember } from "../teamMember";
import { TeamMembers } from "../teamMember/teamMemberDemoData";
import { AddTeamMemberDialog } from "../addTeamMember/addTeamMemberDialog";

const TeamPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="w-[716px] bg-t-gray-2 relative  space-x-2 px-5 py-2 rounded-lg flex items-center">
          <SearchIcon />
          <input
            placeholder="Search member"
            className="bg-transparent w-full text-t-black border-none outline-none"
            type="text"
          />
        </div>
        <AddTeamMemberDialog />
      </div>
      <div className="mt-12">
        <TeamMember teamMembers={TeamMembers} />
      </div>
    </div>
  );
};

export { TeamPage };
