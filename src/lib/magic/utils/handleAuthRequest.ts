import { userRepository } from "@/utils/constants";
import { validateDIDToken } from "./validateDIDToken";
import { createUser } from "@/lib/taas-api/user";

interface AuthenticatedUser {
  id: string;
  email: string;
  walletAddress: string;
}

const handleAuthRequest = async (
  DIDToken: string
): Promise<AuthenticatedUser> => {
  const magicUser = await validateDIDToken(DIDToken);
  let dbUser = await userRepository().filter("email", magicUser.email).getFirst();

  if (!dbUser) {
    dbUser = await createUser({
      email: magicUser.email,
      walletAddress: magicUser.publicAddress,
    });
  }

  return {
    id: dbUser.id,
    email: dbUser.email!,
    walletAddress: dbUser.walletAddress!,
  };
};

export { handleAuthRequest };
