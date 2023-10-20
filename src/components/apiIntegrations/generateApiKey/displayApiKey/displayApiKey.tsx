import { FC } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import toast from "react-hot-toast";
import { CopyIcon, InfoSolidCircleIcon } from "@/assets/icon";
import { useCopyToClipboard } from "usehooks-ts";

interface DisplayApiKeyProps {
  apiKey: string;
}

const DisplayApiKey: FC<DisplayApiKeyProps> = ({ apiKey }) => {
  const [_, copy] = useCopyToClipboard();

  return (
    <section>
      <div className="flex">
        <span className="py-[15px] px-6 bg-t-purple/20 shrink-0 rounded-l">API Key</span>
        <span className="rounded-r bg-t-purple/5 py-[15px] px-6 flex max-w-[78%] item-center gap-[13px]">
          <span className="w-[calc(100%-33px)] truncate">{apiKey}</span>
          <button
            type="button"
            title="copy API key to clipboard"
            onClick={async () => {
              const copied = await copy(apiKey);
              if (copied) {
                toast.success("API key copied");
              }
            }}
          >
            <CopyIcon />
          </button>
        </span>
      </div>
      <div className="flex items-start gap-0.5 w-fit mx-auto justify-center mt-[18px]">
        <InfoSolidCircleIcon />
        <span className="text-t-black/70 text-sm text-center max-w-[297px]">
          Your API Key can only be viewed once. Copy API key before leaving this page.
        </span>
      </div>
      <div className="mt-12 w-full">
        <AlertDialog.Cancel asChild>
          <button
            type="button"
            className="w-full bg-t-purple py-[17px] text-lg px-[57px] flex items-center justify-center text-white rounded"
          >
            Continue
          </button>
        </AlertDialog.Cancel>
      </div>
    </section>
  );
};

export { DisplayApiKey };
