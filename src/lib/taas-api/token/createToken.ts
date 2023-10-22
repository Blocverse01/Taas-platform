import { assetDocumentRepository, assetPropertyRepository, projectRepository } from "@/utils/constants";
import { AssetDocument } from "@/xata";
import { Address } from "viem";
import { TokenizedRealData } from "./types";

export async function createNewProjectAsset(options: any) {

    const newAsset = await assetPropertyRepository().create({
        project: options.projectId,
        tokenAddress: options.tokenAddress,
        description: options.description,
        location: options.location,
        size: options.size,
        tokenPrice: options.tokenPrice,
        tokenTicker: options.tokenTicker,
        photos: options.photos,
        valuation: options.valuation,
        name: options.name
    });

    return newAsset;
}

export async function storeTokenizedRealEstate(
    projectId: string,
    tokenAddress: Address,
    realEstateData: TokenizedRealData
) {

    const project = await projectRepository().read(projectId);

    if(!project){
        throw new Error("");
    }

    const {
        propertyName,
        propertyDescription,
        documents,
        propertyLocation,
        propertySize,
        tokenTicker,
        pricePerToken,
        photos,
    } = realEstateData;

    const tokenizedProperty = await createNewProjectAsset(
        {
            name: propertyName,
            description: propertyDescription,
            location: propertyLocation,
            size: propertySize,
            tokenPrice: pricePerToken,
            project: project.id,
            tokenAddress,
            tokenTicker,
            photos,
        }
    );

    await assetDocumentRepository().create(
        documents.map((doc : any) => ({
            ...doc,
            ownerType: "real estate",
            ownerId: tokenizedProperty.id,
        }))
    );

    return tokenizedProperty.id;
}