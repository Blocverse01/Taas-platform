import { ActivityLog } from "@/xata";

export type ActivityCategory = "asset" | "configuration" | "integration";

export type ActivityLogItem = Pick<ActivityLog, "category" | "ctaLink" | "ctaText" | "title" | "subCategory" | "actor"> & {
    category: ActivityLogCategory;
};

export enum ActivityLogCategory {
   "project"= "project",
    "asset" = "asset"
}

export enum ActivityLogProjectSubCategory {
    "tokenizeAsset" = "tokenized an asset",
    "deployFactory" = "deployed a token factory",
    "createAsset" = "created an asset",
    "createProject" = "created a project",
    "updateAsset" = "updated payment method",
    "generateKey" = "generated API key",
    "deleteKey" = "deleted API key",
    "addTeamMember" = "added a team member",
    "removeTeamMember" = "Removed a team member",
    "updateTeamMember" = "Updated a team member",
}

export enum ActivityLogAssetSubCategory {
    "addDocument" = "added a document",
    "updateDocument" = "updated a documents label",
    "deleteDocument" = "deleted a document",
    "issueTokenTxn" = "started an issue token transaction",
    "delistTokenTxn" = "started a delist token transaction",
    "transferTokenTxn" = "started an transfer token transaction",
    "authorizeTxn" = "authorized a transaction",
    "rejectTxn" = "rejected a transaction",
    "executeTxn" = "executed a transaction",
    "addMultisigOwner" = "added a multi-sig owner",
    "removeMultisigOwner" = "removed a multi-sig owner",
}