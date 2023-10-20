import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getXataClient } from "@/xata";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export const userRepository = () => getXataClient().db.User;
export const projectRepository = () => getXataClient().db.Project;
export const projectTeamRepository = () =>
  getXataClient().db.ProjectTeamMembers;
export const tokenizedPropertyRepository = () => getXataClient().db.TokenizedProperty;
export const assetDocumentRepository = () => getXataClient().db.AssetDocument;
export const apiKeyRepository = () => getXataClient().db.ApiKey;

export const getCurrentAuthUser = (...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse]) => getServerSession(...args, authOptions);
export const fetcher = (input: RequestInfo) => fetch(input).then((r) => r.json());

// HTTP STATUS CODES
export const UNAUTHORIZED = 401;
export const INTERNAL_SERVER_ERROR = 500;
export const BAD_REQUEST = 400;
export const NOT_FOUND = 404;