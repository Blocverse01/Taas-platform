import type {
  ActivityLogAssetSubCategory,
  ActivityLogCategory,
  ActivityLogProjectSubCategory,
} from "@/data/adapters/server/taas-api/activityLog/types";
import { CREATE_ACTIVITY_LOG_ENDPOINT, GET_ACTIVITY_LOG_ENDPOINT } from "@/resources/constants";
import { Address } from "viem";

interface SaveToActivityLogPayload {
  ctaLink: string;
  ctaText: string;
  title: string;
  category: ActivityLogCategory;
  subCategory?: ActivityLogAssetSubCategory | ActivityLogProjectSubCategory;
  actor: Address;
}

const saveToProjectActivityLog = async (
  projectId: string,
  payload: SaveToActivityLogPayload
) => {
  const response = await fetch(CREATE_ACTIVITY_LOG_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      projectId,
      logItem: payload,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Saving to activity log failed");
};

const getProjectActivityLog = async (projectId: string)=> {
  const queryString = new URLSearchParams({ projectId }).toString();

  try {
    const response = await fetch(`${GET_ACTIVITY_LOG_ENDPOINT}?${queryString}`, {
      method: "get",
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) throw new Error("Fetching data failed");

    return (await response.json())?.data;
  } catch (error) {
    throw error;
  }
};

export { saveToProjectActivityLog, getProjectActivityLog };
