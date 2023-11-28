import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { motion } from 'framer-motion';
import { CrossIcon, Exclamation, PlusSign, DeleteIcon } from '@/assets/icon';
import { useModalParent } from '@/data/store/zustand/modalSlice';

const RemoveTeamMemberDialog = () => {
  const dialogContainer = useModalParent();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="flex hover:bg-t-gray-2 rounded p-3 items-center  space-x-2">
          {' '}
          <DeleteIcon /> <span>Remove Team Member</span>
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
            <div className="flex flex-col space-y-[28px]">
              <AlertDialog.Title className=" text-[20px]  text-center text-black">
                Are you sure you want to remove this team member?
              </AlertDialog.Title>

              <p className="flex text-sm w-fit mx-auto text-center space-x-2 items-center">
                <Exclamation />
                <span> This action is permanent; you cannot undo it.</span>
              </p>

              <div className="grid  grid-cols-2 gap-x-6">
                <AlertDialog.Cancel asChild>
                  <button
                    type="button"
                    className="text-white py-[18px] px-[70px] rounded bg-t-black"
                  >
                    Back
                  </button>
                </AlertDialog.Cancel>
                <button type="button" className="text-white py-[18px] px-[70px] rounded bg-t-red-1">
                  Remove
                </button>
              </div>
            </div>
          </motion.div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export { RemoveTeamMemberDialog };
