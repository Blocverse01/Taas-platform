import { UPLOAD_SERVICE_ENDPOINT } from "../../../../resources/constants";

function formatFileSize(bytes: number): string {
  const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

interface FileUploadResponse {
  message: string;
  path: string;
}

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(UPLOAD_SERVICE_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("File Upload failed");

    const data: FileUploadResponse = await response.json();
    return data.path;
  } catch (error) {
    throw error;
  }
};

const testUploadFile = async (file: File) => {
  return URL.createObjectURL(file);
};

export { formatFileSize, uploadFile, testUploadFile };
