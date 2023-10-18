import { FC } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { motion } from "framer-motion";
import { CrossIcon } from "@/assets/icon";
import { useModalParent } from "@/lib/zustand/modalSlice";
import { DisplayApiKey } from "../displayApiKey";

interface DisplayApiKeyDialogProps {
  apiKey: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const DisplayApiKeyDialog: FC<DisplayApiKeyDialogProps> = ({
  apiKey,
  onOpenChange,
  open,
}) => {
  const dialogContainer = useModalParent();
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal container={dialogContainer}>
        <AlertDialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed z-50 inset-0" />
        <AlertDialog.Content className="data-[state=open]:pointer-events-none z-50 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center w-[95vw] max-w-[544px] bg-white border rounded-xl pt-6 px-[57px] pb-[55px] focus:outline-none"
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

            <div className="mt-[44px]">
              <DisplayApiKey apiKey={apiKey} />
            </div>
          </motion.div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export { DisplayApiKeyDialog };
