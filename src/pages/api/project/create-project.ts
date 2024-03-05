import { HttpError } from "@/resources/errors";
import { createNewProject } from "@/data/adapters/server/taas-api/project/addProject";
import { validateAuthInApiHandler } from "@/data/adapters/browser/auth";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  OK,
  UNAUTHORIZED,
} from "@/resources/constants";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = await validateAuthInApiHandler(req, res);

    if (!session) {
      res.status(UNAUTHORIZED).send({});
    }

    const userId = session.user.id;

    const {
      name,
      treasuryWallet,
      tokenFactory,
      multiSigController,
    } = req.body;

    // Todo: do proper validation with a schema
    if (!name.trim() || !multiSigController.trim() || !treasuryWallet.trim() || !treasuryWallet.trim()) {
      throw new HttpError(BAD_REQUEST, "Invalid Body Properties");
    }

    const newProject = await createNewProject({
      name,
      treasuryWallet,
      userId,
      assetType: "real estate",
      tokenFactory,
      multiSigController,
    });

    res.status(OK).json({
      message: "Project Created Successfully",
      data: {
        project: {
          id: newProject.id,
          name: newProject.name
        },
      },
    });
  } catch (error: any) {
    return res
      .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export default handler;
