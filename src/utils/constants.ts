import { getXataClient } from "@/xata";

//Repositories
export const userRepository = () => getXataClient().db.User;
export const projectRepository = () => getXataClient().db.Project;
export const projectTeamRepository = () => getXataClient().db.ProjectTeamMembers;
export const assetTransactionRepository = () => getXataClient().db.AssetTransaction;
export const assetPropertyRepository = () => getXataClient().db.TokenizedProperty;
export const authorizationRequestRepository = () => getXataClient().db.AuthorizationRequest;

//Boolean
export const SPONSOR_TRANSACTION = true
