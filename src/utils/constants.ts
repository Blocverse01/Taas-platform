import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getXataClient } from "@/xata";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

//Repositories
export const userRepository = () => getXataClient().db.User;
export const projectRepository = () => getXataClient().db.Project;
export const projectTeamRepository = () => getXataClient().db.ProjectTeamMembers;
export const assetTransactionRepository = () => getXataClient().db.AssetTransaction;
export const assetPropertyRepository = () => getXataClient().db.TokenizedProperty;
export const authorizationRequestRepository = () => getXataClient().db.AuthorizationRequest;
//export const tokenizedPropertyRepository = () => getXataClient().db.TokenizedProperty;
export const assetDocumentRepository = () => getXataClient().db.AssetDocument;
export const apiKeyRepository = () => getXataClient().db.ApiKey;

//Boolean
export const SPONSOR_TRANSACTION = process.env.NEXT_PUBLIC_SPONSOR_TRANSACTION! as unknown as boolean ?? true;

//Numbers
export const ZERO = 0

//Contract Function Name
export const ISSUE_TOKEN_CONTRACT_FUNCTION_NAME = "issueToken" as const;

export const getCurrentAuthUser = (...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse]) => getServerSession(...args, authOptions);
export const fetcher = (input: RequestInfo) => fetch(input).then((r) => r.json());

// HTTP STATUS CODES
export const UNAUTHORIZED = 401;
export const INTERNAL_SERVER_ERROR = 500;
export const BAD_REQUEST = 400;
export const NOT_FOUND = 404;
