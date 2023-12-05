import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { CrossIcon } from "@/assets/icon";
import { motion } from "framer-motion";

const AuthorizationDialog = () => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="px-[47px] py-[18px] border-t-purple border rounded text-t-purple text-base">
          Issue Token
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
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
            <AlertDialog.Title className="mt-[19px] mb-6 text-[32px] font-medium text-center text-black">
              Issue Asset Token
            </AlertDialog.Title>
            <div className="w-full">Hello</div>
          </motion.div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export { AuthorizationDialog };
