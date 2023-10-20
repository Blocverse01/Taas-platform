import React, { FC } from "react";
import * as Popover from "@radix-ui/react-popover";
import { EditIcon, Ellipsis } from "@/assets/icon";
import { RemoveTeamMemberDialog } from "./removeTeamMember";

interface TeamMembersProps {
  teamMembers: {
    id: number;
    name: string;
    role: string;
    walletAddress: string;
    email: string;
  }[];
}

const TeamMembers: FC<TeamMembersProps> = ({ teamMembers }) => {
  return (
    <div>
      <table className="table-fixed border-separate border-spacing-y-8">
        <thead>
          <tr className="text-left text-t-black/70">
            <th className="w-[300px] px-6 font-medium">Name</th>
            <th className="w-[300px] font-medium">Email Address</th>
            <th className="w-[400px] font-medium">Wallet Address</th>
            <th className="w-[300px] font-medium">Role</th>
            <th className="w-[300px] font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="text-t-black text-sm">
          {teamMembers.map((member) => (
            <tr key={member.id} className="bg-t-gray-2 rounded">
              <td className="p-6 font-medium">{member.name}</td>
              <td className="font-medium">{member.email}</td>
              <td className="font-medium">
                <p className="w-[141px] truncate">{member.walletAddress}</p>
              </td>
              <td className="font-medium">{member.role}</td>
              <td>
                <span className="text-t-purple py-1 px-4 rounded-full bg-t-purple/20">Active</span>
              </td>
              <td className="text-right pr-12">
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <button
                      className="w-[35px] cursor-pointer h-[35px] inline-flex items-center justify-center text-t-black shadow-black/40 outline-none"
                      aria-label="manage team member"
                    >
                      <Ellipsis />
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      className="rounded p-5 flex flex-col  bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.t.black)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                      sideOffset={1}
                    >
                      <RemoveTeamMemberDialog />
                      <button className="flex hover:bg-t-gray-2 rounded p-3  items-center space-x-2">
                        {" "}
                        <EditIcon /> <span>Edit Role</span>
                      </button>
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {teamMembers.length === 0 && <div className="text-center text-sm text-t-black/70">No items to display</div>}
    </div>
  );
};

export { TeamMembers };
