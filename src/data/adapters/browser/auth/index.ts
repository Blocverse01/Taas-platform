import { authenticateEmail } from "../magic/authenticateEmail";
import type { NextApiRequest, NextApiResponse } from "next";
import { signIn, signOut } from "next-auth/react";
import { UNAUTHORIZED, getCurrentAuthUser } from "@/resources/constants";
import { HttpError } from "@/resources/errors";
import { getMagicClient } from "../magic/webClient";

const signInWithEmail = async (email: string) => {
  const didToken = await authenticateEmail(email);
  
  await signIn("credentials", { didToken });
};

const validateAuthInApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const currentUser = await getCurrentAuthUser(req, res);

  if (!currentUser) throw new HttpError(UNAUTHORIZED, "Unauthorized");

  return currentUser;
};

const logOut = async () => {
  const client = getMagicClient();

  await client.user.logout();

  await signOut({ redirect: false, callbackUrl: "/" });
};

export { signInWithEmail, validateAuthInApiHandler, logOut };
