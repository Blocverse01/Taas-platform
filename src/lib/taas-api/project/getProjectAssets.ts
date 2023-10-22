import type { Session } from "next-auth";
import { TokenizedProperty } from "./types";
import { getUserProject } from "./getUserProject";
import { HttpError } from "@/lib/errors";
import { BAD_REQUEST, assetPropertyRepository } from "@/utils/constants";

type ReturnedTokenizedProperty = Omit<TokenizedProperty, "media" | "documents"> & {
    assetLink: string;
}

export const getProjectAssets = async (currentUser: Session["user"], projectId: string): Promise<Array<ReturnedTokenizedProperty>> => {
    if (!currentUser.id.trim() || !projectId.trim()) {
        throw new HttpError(BAD_REQUEST, "Args cannot be empty string");
    }

    const validProject = await getUserProject(currentUser, projectId);

    if (validProject.assetType !== "real estate") {
        throw new HttpError(BAD_REQUEST, "Unsupported asset type");
    }

    const assets = await assetPropertyRepository().filter({
        "project.id": projectId
    }).getAll();

    return assets.map((asset) => ({
        ...asset,
        tokenAddress: asset.tokenAddress as TokenizedProperty["tokenAddress"],
        displayImage: asset.photos ? asset.photos[0] : "",
        type: validProject.assetType,
        assetLink: `/dashboard/projects/${projectId}/assets/${asset.id}`
    }))
}