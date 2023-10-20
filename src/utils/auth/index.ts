import { authenticateEmail } from "@/lib/magic/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "next-auth/react";
import { UNAUTHORIZED, getCurrentAuthUser } from "../constants";
import { HttpError } from "@/lib/errors";

const signInWithEmail = async (email: string) => {
  const didToken = await authenticateEmail(email);
  await signIn("credentials", { didToken });
};

const validateAuthInApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await getCurrentAuthUser(req, res);

  if (!currentUser) throw new HttpError(UNAUTHORIZED, "Unauthorized");

  return currentUser;
}

export { signInWithEmail, validateAuthInApiHandler };
