import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { motion } from 'framer-motion';
import { CrossIcon, PlusSign } from '@/assets/icon';
import { useModalParent } from '@/data/store/zustand/modalSlice';
import { AddTeamMemberForm } from '../addTeamMemberForm';
import { FC } from 'react';
import { useSWRConfig } from 'swr';

interface AddTeamMemberProps {
  projectId: string;
}

const AddTeamMemberDialog: FC<AddTeamMemberProps> = ({ projectId }) => {
  const dialogContainer = useModalParent();

  const { mutate } = useSWRConfig();
  const teamMembersSwrKey = `/api/user/projects/${projectId}/team`;

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="flex text-white p-4 bg-t-purple rounded items-center space-x-2">
          <PlusSign />
          Add New Member
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal container={dialogContainer}>
        <AlertDialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed z-50 inset-0" />
        <AlertDialog.Content className="data-[state=open]:pointer-events-none z-50 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center w-[95vw] max-w-[544px] bg-white border rounded-xl pt-[29px] px-[57px] pb-[59px] focus:outline-none"
          >
            <AlertDialog.Cancel asChild>
              <button
                type="button"
                className="h-9 w-9 focus:shadow-slate-100 inline-flex appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none bg-t-gray-2 ml-auto"
                aria-label="Close"
              >
                <CrossIcon />
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Title className="mt-[19px] mb-6 text-[24px] font-medium text-center text-t-black">
              Add Team Member
            </AlertDialog.Title>
            <div className="w-full">
              <AddTeamMemberForm
                handleCreateTeamMember={async (values) => {
                  const response = await fetch(
                    `/api/user/projects/${projectId}/team/add-team-member`,
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'Application/json',
                      },
                      body: JSON.stringify(values),
                    }
                  );

                  mutate(teamMembersSwrKey, [values]);

                  if (!response.ok) throw new Error('Invalid response');
                }}
                backButton={
                  <AlertDialog.Cancel asChild>
                    <button
                      type="button"
                      className="text-white py-[18px] px-[70px] text-[18px] rounded bg-t-black"
                    >
                      Back
                    </button>
                  </AlertDialog.Cancel>
                }
              />
            </div>
          </motion.div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export { AddTeamMemberDialog };
