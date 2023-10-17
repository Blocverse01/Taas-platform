import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { TAAS_PURPLE } from "tailwind.config";

interface PhotoUploaderProps {
  uploadPhoto: (file: File) => Promise<string>;
  onUploadComplete: (fileUrl: string) => void;
  maxSize: number;
}

const PHOTO_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const PhotoUploader: FC<PhotoUploaderProps> = ({
  uploadPhoto,
  onUploadComplete,
}) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>();
  const [photoSrc, setPhotoSrc] = useState<string>();
  const [fileToRetry, setFileToRetry] = useState<File>();

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);
      setUploadError("");

      const fileUrl = await uploadPhoto(file);

      onUploadComplete(fileUrl);

      setPhotoSrc(undefined);
      setFileToRetry(undefined);
    } catch (error) {
      console.log(error);
      setFileToRetry(file);
      setUploadError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];

    if (file.size <= 0) {
      setUploadError("Choose a valid image");
      return;
    }
    if (!PHOTO_MIME_TYPES.includes(file.type)) {
      setUploadError("Choose a valid image");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoSrc(reader.result as string);
    };
    reader.readAsDataURL(file);

    await handleUpload(file);
  };

  const retryUpload = async () => {
    if (!fileToRetry) return;
    await handleUpload(fileToRetry);
  };

  return (
    <div>
      {photoSrc ? (
        <div className="relative rounded">
          <div className="relative min-w-[120px] w-full h-[80px]">
            <Image
              src={photoSrc}
              alt="uploaded photo"
              fill
              className="object-cover rounded w-full"
            />
          </div>
          {uploadError && (
            <div className="absolute inset-0 flex justify-center items-center bg-t-black/30 backdrop-blur-sm">
              <button
                onClick={retryUpload}
                type="button"
                className="py-1 px-2 rounded-full border border-white text-white text-center text-sm"
              >
                Retry Upload
              </button>
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 flex justify-center items-center bg-t-black/20">
              <BounceLoader size={40} color={TAAS_PURPLE} />
            </div>
          )}
        </div>
      ) : (
        <label
          htmlFor="upload-photo"
          className="flex items-center h-full justify-center p-5 border border-dashed border-gray-300"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="9.5" stroke="#1A1A1A" />
            <path
              d="M7.90605 12.8681C7.69287 12.8681 7.51045 12.7922 7.35877 12.6405C7.20683 12.4886 7.13086 12.306 7.13086 12.0929V10.9301H7.90605V12.0929H12.5572V10.9301H13.3324V12.0929C13.3324 12.306 13.2566 12.4886 13.1049 12.6405C12.953 12.7922 12.7704 12.8681 12.5572 12.8681H7.90605ZM9.84404 11.3177V8.15875L8.83628 9.1665L8.29365 8.60449L10.2316 6.6665L12.1696 8.60449L11.627 9.1665L10.6192 8.15875V11.3177H9.84404Z"
              fill="#1A1A1A"
            />
          </svg>

          <input
            aria-label="upload photo"
            className="sr-only"
            id="upload-photo"
            type="file"
            onChange={handleChange}
            accept="image/*"
          />
        </label>
      )}
      {uploadError && (
        <div className="text-sm mt-1 text-red-500">{uploadError}</div>
      )}
      {uploading && (
        <div className="text-sm mt-1 text-t-purple">Uploading...</div>
      )}
    </div>
  );
};

export { PhotoUploader };
