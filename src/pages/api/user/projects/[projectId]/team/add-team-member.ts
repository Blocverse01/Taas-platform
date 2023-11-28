import { HttpError } from "@/resources/errors";
import { addNewTeamMember } from "@/data/adapters/server/taas-api/team/addNewMember";
import { validateAuthInApiHandler } from "@/data/adapters/browser/auth";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from "@/resources/constants";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const USER_ROLES = {
    "developer": 1,
    "admin": 2,
    "owner": 3
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const session = await validateAuthInApiHandler(req, res);

        if (!session) {
            res.status(UNAUTHORIZED).send({});
        }

        const userId = session.user.id;

        const { name, email, role } = req.body;

        if (!name.trim() || !email || !role) {
            throw new HttpError(BAD_REQUEST, "Invalid Body Properties");
        }

        await addNewTeamMember(session, {
            name,
            email,
            role: `${USER_ROLES[role as "admin" | "developer" | "owner"]}`,
            projectId: req.query.projectId! as string
        });

        res.status(OK).json({ message: "Team member added Successfully" });
    } catch (error: any) {
        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;
