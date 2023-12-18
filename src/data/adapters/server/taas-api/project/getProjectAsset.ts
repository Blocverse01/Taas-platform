import type { Session } from "next-auth";
import { TokenizedProperty } from "./types";
import { getUserProject } from "./getUserProject";
import { HttpError } from "@/resources/errors";
import { BAD_REQUEST, NOT_FOUND, assetDocumentRepository, assetPropertyRepository } from "@/resources/constants";
import { SelectableColumnWithObjectNotation } from "@xata.io/client";
import { TokenizedPropertyRecord } from "@/xata";
import { Address } from "viem";

type ReturnedTokenizedProperty = Omit<TokenizedProperty, "media" | "displayImage"> & {
    project: {
        name: string;
        id: string;
        tokenFactory: Address;
        multiSigController: Address;
    }
};

export const getProjectAsset = async (currentUser: Session["user"], projectId: string, assetId: string): Promise<ReturnedTokenizedProperty> => {
    if (!currentUser.id.trim() || !projectId.trim() || !assetId.trim()) {
        throw new HttpError(BAD_REQUEST, "Args cannot be empty string");
    }

    const validProject = await getUserProject(currentUser, projectId);

    if (validProject.assetType !== "real estate") {
        throw new HttpError(BAD_REQUEST, "Unsupported asset type");
    }

    const initialAssetQuery = assetPropertyRepository().filter({
        "project.owner.id": currentUser.id,
        "project.id": projectId,
    });


    const select: SelectableColumnWithObjectNotation<TokenizedPropertyRecord, []>[] = ["id", "name", "description", "location", "size", "tokenAddress", "tokenPrice", "tokenTicker", "valuation", "project.id", "project.blockchain", "project.multisigController", "project.tokenFactory"];

    const asset = await initialAssetQuery.filter({
        "id": assetId,
    }).select(select).getFirst() ?? await initialAssetQuery.filter({
        "tokenAddress": assetId,
    }).select(select).getFirst();

    if (!asset) {
        throw new HttpError(NOT_FOUND, "Asset not found");
    }

    const documents = await assetDocumentRepository().filter("ownerId", asset.id).select(["id", "fileSize", "fileURI", "label", "fileType"]).getAll();

    return {
        id: asset.id,
        name: asset.name,
        location: asset.location,
        tokenPrice: asset.tokenPrice,
        tokenTicker: asset.tokenTicker,
        valuation: asset.valuation,
        size: asset.size,
        description: asset.description,
        documents: documents.map((doc) => ({
            id: doc.id,
            label: doc.label,
            fileSize: doc.fileSize,
            fileType: doc.fileType,
            fileURI: doc.fileURI
        })),
        type: validProject.assetType,
        tokenAddress: asset.tokenAddress as TokenizedProperty["tokenAddress"],
        project: {
            name: validProject.name,
            id: validProject.id,
            tokenFactory: validProject.tokenFactory,
            multiSigController: validProject.multisigController
        },
    }
}