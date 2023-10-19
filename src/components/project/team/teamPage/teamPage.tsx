import { SearchIcon } from "@/assets/icon";
import React, { useState } from "react";
import { TeamMember } from "../teamMember";
import { TeamMembers } from "../teamMember/teamMemberDemoData";
import { AddTeamMemberDialog } from "../addTeamMember/addTeamMemberDialog";

const TeamPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredTeamMembers, setFilteredTeamMembers] = useState(TeamMembers);

  const handleSearchInputChange = (inputValue: string) => {
    setSearchInput(inputValue);

    const filteredMembers = TeamMembers.filter((member) =>
      member.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredTeamMembers(filteredMembers);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="w-[716px] bg-t-gray-2 relative  space-x-2 px-6 py-4 rounded-lg flex items-center">
          <SearchIcon />
          <input
            placeholder="Search member"
            className="bg-transparent w-full text-t-black border-none outline-none"
            type="text"
            value={searchInput}
            onChange={(e) => handleSearchInputChange(e.target.value)}
          />
        </div>
        <AddTeamMemberDialog />
      </div>
      <div className="mt-12">
        <TeamMember teamMembers={filteredTeamMembers} />
      </div>
    </div>
  );
};

export { TeamPage };
