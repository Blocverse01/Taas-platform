import { getMagicClient } from "@/data/adapters/browser/magic/webClient";

export const authenticateEmail = async (email: string) => {
  const magic = getMagicClient();

  const didToken = await magic.auth.loginWithEmailOTP({ email });

  return didToken;
};
