import React, { type FC, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ArrowDown } from '@/assets/icon';
import * as RadioGroup from '@radix-ui/react-radio-group';
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';
import { TAAS_PURPLE } from 'tailwind.config';

interface TeamMemberRolePickerProps {
  handleRoleChange: (newRole: number) => Promise<void>;
  role: number;
  roles: {
    [key: number]: string;
  };
}

const TeamMemberRolePicker: FC<TeamMemberRolePickerProps> = ({ role, handleRoleChange, roles }) => {
  const [currentUserRole, setCurrentUserRole] = useState(role);
  const [updatingRole, setUpdatingRole] = useState(false);

  const currentRoleName = roles[currentUserRole];

  const roleKeys = Object.keys(roles);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex items-center justify-center outline-none gap-2"
          aria-label="Change user role"
        >
          {currentRoleName}{' '}
          <svg
            width="8"
            height="6"
            viewBox="0 0 8 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 5.76683L0 1.76683L0.933333 0.833496L4 3.90016L7.06667 0.833496L8 1.76683L4 5.76683Z"
              fill="#1A1A1A"
            />
          </svg>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white rounded-md p-6 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade relative"
          sideOffset={5}
        >
          {updatingRole && (
            <div className="flex absolute top-2 items-center gap-2">
              <ClipLoader size={25} color={TAAS_PURPLE} /> updating role.
            </div>
          )}
          <RadioGroup.Root
            className="flex flex-col gap-2.5 pt-4"
            value={`${currentUserRole}`}
            aria-label="Select a new role"
            onValueChange={async (value) => {
              try {
                setUpdatingRole(true);

                await handleRoleChange(+value);

                setCurrentUserRole(+value);

                toast.success('Role updated');
              } catch (error) {
                toast.error('Updating user role failed');
              } finally {
                setUpdatingRole(false);
              }
            }}
          >
            {roleKeys.map((key) => (
              <div key={key} className="flex items-center">
                <RadioGroup.Item
                  className="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-black/45 hover:bg-purple-300 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
                  value={key}
                  id={key}
                >
                  <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-t-purple" />
                </RadioGroup.Item>
                <label className="text-[15px] leading-none pl-[15px]" htmlFor={key}>
                  {roles[+key]}
                </label>
              </div>
            ))}
          </RadioGroup.Root>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export { TeamMemberRolePicker };
