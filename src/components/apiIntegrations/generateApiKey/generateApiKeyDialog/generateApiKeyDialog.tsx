import { ComponentProps, FC, useState } from 'react';
import { GenerateApiKey } from '../generateApiKey';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { motion } from 'framer-motion';
import { CrossIcon } from '@/assets/icon';
import { useModalParent } from '@/data/store/zustand/modalSlice';
import { DisplayApiKey } from '../displayApiKey';

type GenerateApiKeyDialogProps = Omit<ComponentProps<typeof GenerateApiKey>, 'backButton'>;

const GenerateApiKeyDialog: FC<GenerateApiKeyDialogProps> = ({ generateApiKey, projects }) => {
  const dialogContainer = useModalParent();

  const [open, setOpen] = useState<boolean>(false);
  const [generatedApiKey, setGeneratedApiKey] = useState<string>();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setGeneratedApiKey(undefined);
    }
    setOpen(open);
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={handleOpenChange}>
      <AlertDialog.Trigger asChild>
        <button
          type="button"
          className="flex items-center justify-between py-[17px] px-[77px] text-lg bg-t-purple text-white w-full rounded"
        >
          Generate new API Key
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

            {generatedApiKey && (
              <div className="mt-[44px]">
                <DisplayApiKey apiKey={generatedApiKey} />
              </div>
            )}

            {!generatedApiKey && (
              <>
                <AlertDialog.Title className="mt-[19px] text-[32px] font-medium text-center text-black">
                  Generate API Key
                </AlertDialog.Title>
                <AlertDialog.Description className="text-center text-black text-base mt-4">
                  Please select a project to generate an API Key for.
                </AlertDialog.Description>
                <div className="w-full mt-9">
                  <GenerateApiKey
                    backButton={
                      <AlertDialog.Cancel asChild>
                        <button
                          type="button"
                          className="text-white py-[18px] px-[70px] rounded bg-t-black"
                        >
                          Back
                        </button>
                      </AlertDialog.Cancel>
                    }
                    generateApiKey={async (projectId) => {
                      const apiKey = await generateApiKey(projectId);
                      setGeneratedApiKey(apiKey);
                      return apiKey;
                    }}
                    projects={projects}
                  />
                </div>
              </>
            )}
          </motion.div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export { GenerateApiKeyDialog };
