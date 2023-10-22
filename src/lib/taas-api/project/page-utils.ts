import { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, getCurrentAuthUser, projectRepository } from "@/utils/constants";
import { GetServerSidePropsContext } from "next";
import { getUserProject } from "./getUserProject";
import { getProjectAsset } from "./getProjectAsset";
import { HttpError } from "@/lib/errors";

export const getProjectPageProp = async (context: GetServerSidePropsContext) => {
    const authSession = await getCurrentAuthUser(context.req, context.res);
    if (!authSession) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    const projectId = context.params?.projectId;
    if (!projectId) {
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        };
    }

    try {
        const project = await getUserProject(authSession.user, projectId as string);
        return { project };
    } catch (error: any) {
        if (error instanceof HttpError) {
            if (error.status === NOT_FOUND || error.status === UNAUTHORIZED) {
                return {
                    redirect: {
                        destination: "/404",
                        permanent: false,
                    },
                };
            }
        }
        throw new Error(error.message);
    }
};

export const getProjectAssetPageProp = async (context: GetServerSidePropsContext) => {
    const authSession = await getCurrentAuthUser(context.req, context.res);
    if (!authSession) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    const projectId = context.params?.projectId;
    const assetId = context.params?.assetId;

    if (!projectId || !assetId) {
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        };
    }

    try {
        const asset = await getProjectAsset(authSession.user, projectId as string, assetId as string);
        return { asset };
    } catch (error: any) {
        if (error instanceof HttpError) {
            if (error.status === NOT_FOUND || error.status === BAD_REQUEST) {
                return {
                    redirect: {
                        destination: "/404",
                        permanent: false,
                    },
                };
            }
        }
        throw new Error(error.message);
    }
};