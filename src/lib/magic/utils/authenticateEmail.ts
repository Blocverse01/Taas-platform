import { getMagicClient } from "@/lib/magic/clients/web";

export const authenticateEmail = async (email: string) => {
  const magic = getMagicClient();

  const didToken = await magic.auth.loginWithEmailOTP({ email });
  return didToken;
};
