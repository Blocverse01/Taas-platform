import { assetDocumentRepository, assetPropertyRepository, projectRepository } from "@/resources/constants";
import { Address } from "viem";
import { CreateProjectAssetOptions, TokenizedRealData } from "./types";

async function createNewProjectAsset(options: CreateProjectAssetOptions) {

    const newAsset = await assetPropertyRepository().create({
        project: options.project.id,
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

    if (!project) {
        throw new Error("Project Not Found");
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
        valuation
    } = realEstateData;

    const tokenizedProperty = await createNewProjectAsset(
        {
            tokenAddress,
            tokenTicker,
            photos,
            name: propertyName,
            description: propertyDescription,
            location: propertyLocation,
            size: propertySize,
            tokenPrice: pricePerToken,
            project: {
                id: project.id
            },
            valuation: parseFloat(`${valuation}`),
        }
    );

    await assetDocumentRepository().create(
        documents.map((doc: any) => ({
            ...doc,
            ownerType: "real estate",
            ownerId: tokenizedProperty.id,
        }))
    );

    return tokenizedProperty.id;
}