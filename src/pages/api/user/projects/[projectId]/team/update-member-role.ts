import { HttpError } from "@/resources/errors";
import { updateTeamMemberRole } from "@/data/adapters/server/taas-api/team/manageMember";
import { validateAuthInApiHandler } from "@/data/adapters/browser/auth";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from "@/resources/constants";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import * as Yup from "yup";

const VALID_USER_ROLES = [1, 2, 3];

const updateRoleSchema = Yup.object({
    newRole: Yup.number().required().oneOf(VALID_USER_ROLES),
    teamMemberUserId: Yup.string().required(),
    projectId: Yup.string().required()
})

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await validateAuthInApiHandler(req, res);

        if (!session) {
            res.status(UNAUTHORIZED).send({});
        }

        const { newRole, teamMemberUserId, projectId } = await updateRoleSchema.validate({
            ...req.body,
            ...req.query
        });

        if (!newRole || !VALID_USER_ROLES.includes(newRole)) {
            throw new HttpError(BAD_REQUEST, "Invalid Body Properties");
        }

        await updateTeamMemberRole(session, {
            teamMemberUserId: teamMemberUserId,
            newRole: newRole.toString(),
            projectId
        });

        res.status(OK).json({ message: "Role updated Successfully" });
    } catch (error: any) {
        console.log(error);
        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;
