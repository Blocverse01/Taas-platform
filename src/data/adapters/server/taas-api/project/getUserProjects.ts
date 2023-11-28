import { projectRepository, projectTeamRepository } from "@/resources/constants";
import type { Session } from "next-auth";
import { TAASProject } from "./types";

type Address = TAASProject["multisigController"];

const getUserProjects = async (currentUser: Session["user"], onlyOwnedProjects?: true): Promise<Array<TAASProject>> => {
    const projectRecords = [];

    const ownedProjects = await projectRepository().filter("owner.id", currentUser.id).getAll();
    projectRecords.push(...ownedProjects);

    if (!onlyOwnedProjects) {
        const teamMemberships = await projectTeamRepository().filter("user.id", currentUser.id).select(["project.*"]).getAll();

        const teamProjects = teamMemberships.map((membership) => membership.project!).filter((project) => project !== null);

        projectRecords.push(...teamProjects);
    }

    return projectRecords.map((project) => ({
        name: project.name,
        assetType: project.assetType as AssetType,
        createdAt: project.createdAt.toUTCString(),
        id: project.id,
        multisigController: project.multisigController as Address,
        treasuryWallet: project.treasuryWallet as Address,
        ownerId: project.owner!.id,
        tokenFactory: project.tokenFactory as Address,
        web3Environment: project.web3Environment as TAASProject["web3Environment"],
        enabledPaymentMethods: project.enabledPaymentMethods ? project.enabledPaymentMethods as Address[] : []
    }))
}

export { getUserProjects }