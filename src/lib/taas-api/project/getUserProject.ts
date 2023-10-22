import { NOT_FOUND, UNAUTHORIZED, projectRepository } from "@/utils/constants";
import type { Session } from "next-auth";
import { TAASProject } from "./types";
import { getTeamMembers } from "../team";
import { HttpError } from "@/lib/errors";

type Address = TAASProject["multisigController"];

export const getUserProject = async (currentUser: Session["user"], projectId: string, onlyOwnedProject?: true): Promise<TAASProject> => {
    const project = await projectRepository()
        .filter({
            id: projectId,
        })
        .getFirst();

    if (!project) throw new HttpError(NOT_FOUND, "Not found");

    const projectTeam = await getTeamMembers(currentUser, projectId);

    const isProjectOwner = project.owner ? project.owner.id === currentUser.id : false;
    const isProjectTeamMember = projectTeam.some((member) => member.email === currentUser.email);

    let canAccessProject: boolean;

    if (onlyOwnedProject) {
        canAccessProject = isProjectOwner;
    } else {
        canAccessProject = isProjectOwner || isProjectTeamMember;
    }

    if (!canAccessProject) throw new HttpError(UNAUTHORIZED, "Not found");

    return {
        name: project.name,
        assetType: project.assetType as AssetType,
        createdAt: project.createdAt.toUTCString(),
        id: project.id,
        multisigController: project.multisigController as Address,
        treasuryWallet: project.treasuryWallet as Address,
        ownerId: project.owner!.id,
        tokenFactory: project.tokenFactory as Address,
        web3Environment: project.web3Environment as TAASProject["web3Environment"],
        enabledPaymentMethods: project.enabledPaymentMethods ? (project.enabledPaymentMethods as Address[]) : [],
    };
};