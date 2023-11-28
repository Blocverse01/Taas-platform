import { CreateNewProjectOptions } from "@/data/adapters/server/taas-api/project/types";
import { CREATE_PROJECT_ENDPOINT } from "@/resources/constants";

export const storeProjectItem = async (
  payload: Omit<CreateNewProjectOptions, "userId">
) => {
  try {
    const response = await fetch(CREATE_PROJECT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("File Upload failed");

    return (
      (await response.json()) as {
        data: {
          project: {
            id: string;
          };
        };
      }
    ).data.project;
  } catch (error) {
    throw error;
  }
};
