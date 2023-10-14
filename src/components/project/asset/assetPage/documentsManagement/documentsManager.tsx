import { DownloadCircle } from "@/assets/icon";
import { formatFileSize } from "@/utils/files";
import { FC } from "react";

interface Document {
  label: string;
  fileURI: string;
  fileSize: number; // in bytes
  id: string;
}

interface DocumentsManagerProps {
  documents: Array<Document>;
}

const DocumentCard: FC<{
  document: Document;
}> = ({ document }) => {
  const { label, fileURI, fileSize } = document;

  const fileName = fileURI.split("/")[fileURI.split("/").length - 1];

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-t-black text-base">{label}</h3>
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

export { DocumentsManager };
