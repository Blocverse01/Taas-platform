import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { motion } from "framer-motion";
import { CrossIcon, Logout } from "@/assets/icon";
import { useModalParent } from "@/lib/zustand/modalSlice";

const LogoutDialog = () => {
  const dialogContainer = useModalParent();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="flex text-t-purple items-center space-x-2">
          <Logout />
          <span> Logout</span>
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
            className="flex flex-col items-center justify-center w-[95vw] max-w-[570px] bg-white border rounded-xl pt-[29px] px-[57px] pb-[59px] focus:outline-none"
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
            <div className="w-full flex flex-col mt-6 space-y-6">
              <p className="text-xl">
                Are you sure you want to logout from this account?
              </p>
              <div className="grid  grid-cols-2 gap-x-2">
                <AlertDialog.Cancel asChild>
                  <button
                    type="button"
                    className="text-white py-[18px] px-[70px] text-[18px] rounded bg-t-black"
                  >
                    Back
                  </button>
                </AlertDialog.Cancel>
                <button
                  type="button"
                  className="text-white py-[18px] px-[70px] text-[18px] rounded bg-t-red-1"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export { LogoutDialog };
