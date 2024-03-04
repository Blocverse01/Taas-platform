import { NOT_FOUND, projectRepository, userRepository } from "@/resources/constants";
import { WEB3_ENVIRONMENT } from "@/resources/utils/web3/environment";
import { CreateNewProjectOptions } from "./types";
import { storeProjectActivityLogItem } from "../activityLog/createActivityLog";
import { ActivityLogCategory, ActivityLogProjectSubCategory } from "../activityLog/types";
import { createActivityLogTitle } from "../../../browser/taas-web/activityLog/utils";
import { getUserById } from "../user";
import { HttpError } from "@/resources/errors";

export async function createNewProject(options: CreateNewProjectOptions) {

    const user = await getUserById(options.userId);

    if (!user) {
        throw new HttpError(NOT_FOUND, "Invalid User")
    }

    const newProject = await projectRepository().create({
        name: options.name,
        assetType: options.assetType,
        owner: options.userId,
        blockchain: options.blockchain,
        treasuryWallet: options.treasuryWallet,
        multisigController: options.multiSigController,
        tokenFactory: options.tokenFactory,
        web3Environment: WEB3_ENVIRONMENT,
    });

    await storeProjectActivityLogItem(newProject.id, {
        title: createActivityLogTitle(ActivityLogProjectSubCategory["createProject"], ActivityLogCategory["project"], newProject.name),
        category: ActivityLogCategory["project"],
        subCategory: ActivityLogProjectSubCategory["createProject"],
        actor: user.walletAddress,
        ctaLink: `/projects/${newProject.id}`,
        ctaText:"View Project"
    });

    return newProject;
}