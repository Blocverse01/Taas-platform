import { ZERO, assetPropertyRepository } from "@/resources/constants";

export async function getAssetCount(projectId: string) {
    const assets = await assetPropertyRepository().filter({
        "project.id": projectId
    }).getAll();

    return assets.length;
}