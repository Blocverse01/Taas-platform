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
export const activityLogRepository = () => getXataClient().db.ActivityLog;
export const assetDocumentRepository = () => getXataClient().db.AssetDocument;
export const apiKeyRepository = () => getXataClient().db.ApiKey;

//Boolean
// export const SPONSOR_TRANSACTION = process.env.NEXT_PUBLIC_SPONSOR_TRANSACTION! as unknown as boolean ?? true;
export const SPONSOR_TRANSACTION = true;

//Numbers
export const ZERO = 0
export const FOUR = 4
export const ONE_THOUSAND = 1000
export const TEN = 10

//Contract Function Name
export const ISSUE_TOKEN_CONTRACT_FUNCTION_NAME = "issueToken" as const;

//Endpoints
export const UPLOAD_SERVICE_ENDPOINT = "https://web3storage-service.vercel.app/upload-file";
export const GET_ACTIVITY_LOG_ENDPOINT = "/api/activityLog/getActivityLog";
export const CREATE_ACTIVITY_LOG_ENDPOINT = "/api/activityLog/storeActivityLog";
export const CREATE_PROJECT_ENDPOINT = "/api/project/create-project";
export const GET_PROJECT_DASHBOARD_ENDPOINT = "/api/project/get-dashboard";
export const CREATE_ASSET_ENDPOINT = "/api/asset/create-asset";

//helpers
export const getCurrentAuthUser = (...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse]) => getServerSession(...args, authOptions);
export const fetcher = (input: RequestInfo) => fetch(input).then((r) => r.json());

// HTTP STATUS CODES
export const UNAUTHORIZED = 401;
export const INTERNAL_SERVER_ERROR = 500;
export const BAD_REQUEST = 400;
export const NOT_FOUND = 404;
export const OK = 200;


export const OLD_PLATFORM_ENTRY_CONTRACTS = ["0xcf25B4Aa97EB446D2E6a73fEf3068f6ed53D852E"]
