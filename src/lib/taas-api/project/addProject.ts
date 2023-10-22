import { projectRepository, userRepository } from "@/utils/constants";
import { WEB3_ENVIRONMENT } from "@/utils/web3/environment";
import { CreateNewProjectOptions } from "./types";

export async function createNewProject(options: CreateNewProjectOptions) {

    const newProject = await projectRepository().create({
        name: options.name,
        assetType: options.assetType,
        owner: options.userId,
        blockchain: options.blockchain,
        treasuryWallet: options.treasuryWallet,
        web3Environment: WEB3_ENVIRONMENT,
    });

    return newProject;
}