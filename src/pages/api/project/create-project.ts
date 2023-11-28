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
import { Address } from "viem";

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
      blockchain,
      treasuryWallet,
      tokenFactory,
      multiSigController,
    } = req.body;

    if (!name.trim() || !blockchain || !treasuryWallet) {
      throw new HttpError(BAD_REQUEST, "Invalid Body Properties");
    }

    const newProject = await createNewProject({
      name,
      blockchain,
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
