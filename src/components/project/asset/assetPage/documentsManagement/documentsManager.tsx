import { DeleteIcon, DownloadCircle, EditIcon, Ellipsis } from "@/assets/icon";
import { formatFileSize } from "@/utils/files";
import { FC } from "react";
import * as Popover from "@radix-ui/react-popover";
import { useModalParent } from "@/lib/zustand/modalSlice";

interface Document {
  label: string;
  fileURI: string;
  fileSize: number; // in bytes
  id: string;
}

interface DocumentsManagerProps {
  documents: Array<Document>;
}

const DocumentsManager: FC<DocumentsManagerProps> = ({ documents }) => {
  return (
    <section className="bg-t-gray-2 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-[31px]">
        <h3 className="text-t-black text-2xl font-medium">Documents</h3>
        <button className="underline text-t-purple text-base">Add New Document</button>
      </div>
      <section className="grid grid-cols-3 gap-8">
        {documents.map((doc) => (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </section>
    </section>
  );
};

const DocumentCard: FC<{
  document: Document;
}> = ({ document }) => {
  const { label, fileURI, fileSize } = document;

  const fileName = fileURI.split("/")[fileURI.split("/").length - 1];

  const modalParent = useModalParent();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-t-black text-base">{label}</h3>
        <Popover.Root>
          <Popover.Trigger asChild>
            <button aria-label="See document options">
              <Ellipsis />
            </button>
          </Popover.Trigger>
          <Popover.Portal container={modalParent}>
            <Popover.Content
              align="center"
              className="rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
              sideOffset={5}
            >
              <div className="flex flex-col gap-4">
                <button type="button" className="flex items-center gap-2.5">
                  <DeleteIcon />
                  <span className="text-t-black">Delete Document</span>
                </button>
                <button type="button" className="flex items-center gap-2.5">
                  <EditIcon />
                  <span className="text-t-black">Edit Label</span>
                </button>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
      <div className="bg-t-faded-purple rounded-lg py-[18px] px-4 flex items-start justify-between gap-3">
        <p className="w-[calc(100%-48px)]">
          <h4 className="text-t-black text-sm truncate">{fileName}</h4>
          <span className="text-t-gray-4 text-xs mt-[7px]">{formatFileSize(fileSize)}</span>
        </p>
        <div className="shrink-0 w-[36px]">
          <DownloadCircle />
        </div>
      </div>
    </div>
  );
};

export { DocumentsManager };
