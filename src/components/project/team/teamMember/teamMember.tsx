import React, { FC } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { EditIcon, MenuDots, TrashIcon } from "@/assets/icon";
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

const TeamMember: FC<TeamMembersProps> = ({ teamMembers }) => {
  return (
    <div>
      <table className="table-fixed">
        <thead>
          <tr className="text-left  text-[#1A1A1AB2] ">
            <th className="w-[200px]">
              <Checkbox.Root
                className="flex h-[25px] w-[25px] border border-black appearance-none items-center justify-center rounded-[4px] bg-white  outline-none "
                id="c1"
              >
                <Checkbox.Indicator>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
            </th>
            <th className="w-[300px] font-medium">Name</th>
            <th className="w-[300px] font-medium">Email Address</th>
            <th className="w-[400px] font-medium">Wallet Address</th>
            <th className="w-[300px] font-medium">Role</th>
            <th className="w-[300px] font-medium">Activity</th>
          </tr>
        </thead>
        <tbody className="text-t-black relative top-4">
          {teamMembers.map((member) => (
            <tr key={member.id} className="bg-t-gray-2  ">
              <td className=" py-4 px-4">
                <Checkbox.Root
                  className="  flex h-[25px] w-[25px] border border-black appearance-none items-center justify-center rounded-[4px] bg-white  outline-none "
                  id="c1"
                >
                  <Checkbox.Indicator className="text-violet11">
                    <CheckIcon />
                  </Checkbox.Indicator>
                </Checkbox.Root>
              </td>
              <td className=" font-medium">{member.name}</td>
              <td className=" font-medium">{member.email}</td>
              <td className=" truncate font-medium">
                <p className="w-[141px] truncate">{member.walletAddress}</p>
              </td>
              <td className=" font-medium">{member.role}</td>
              <td>
                <span className="text-t-purple py-1 px-4 rounded-full bg-t-purple4 ">
                  {" "}
                  Active
                </span>
              </td>
              <td className="w-[300px]">
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <button
                      className=" w-[35px] cursor-pointer h-[35px] inline-flex items-center justify-center text-violet11   shadow-blackA4    outline-none"
                      aria-label="Update dimensions"
                    >
                      <MenuDots />
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      className="rounded p-5 flex flex-col  bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
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
    </div>
  );
};

export { TeamMember };
