import type {
  ActivityLogAssetSubCategory,
  ActivityLogCategory,
  ActivityLogProjectSubCategory,
} from "@/lib/taas-api/activityLog/types";
import { Address } from "viem";

interface SaveToActivityLogPayload {
  ctaLink: string;
  ctaText: string;
  title: string;
  category: ActivityLogCategory;
  subCategory?: ActivityLogAssetSubCategory | ActivityLogProjectSubCategory;
  actor: Address;
}

const saveToActivityLog = async (
  projectId: string,
  payload: SaveToActivityLogPayload
) => {
  const endpoint = "/api/activityLog/storeActivityLog";

  const response = await fetch(endpoint, {
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

export { saveToActivityLog };
