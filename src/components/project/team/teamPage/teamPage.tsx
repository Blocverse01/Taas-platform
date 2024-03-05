import { SearchIcon } from '@/assets/icon';
import React, { ComponentProps, FC, useState } from 'react';
import { TeamMembers } from '../teamMember';
import { AddTeamMemberDialog } from '../addTeamMember/addTeamMemberDialog';
import { updateTeamMemberRole } from '@/data/adapters/browser/taas-web/team/management';

interface TeamPageProps {
  teamMembers: ComponentProps<typeof TeamMembers>['teamMembers'];
  projectId: string;
}

const TeamPage: FC<TeamPageProps> = ({ teamMembers, projectId }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredTeamMembers, setFilteredTeamMembers] = useState(teamMembers);

  const handleSearchInputChange = (inputValue: string) => {
    setSearchInput(inputValue);

    const filteredMembers = teamMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        member.email.toLowerCase().includes(inputValue.toLowerCase())
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
        <AddTeamMemberDialog projectId={projectId} />
      </div>
      <div className="mt-12">
        <TeamMembers
          handleRoleChange={(newRole, teamMemberUserId) =>
            updateTeamMemberRole({
              newRole,
              teamMemberUserId,
              projectId,
            })
          }
          teamMembers={filteredTeamMembers}
        />
      </div>
    </div>
  );
};

export { TeamPage };
