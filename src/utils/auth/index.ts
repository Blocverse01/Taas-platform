import { authenticateEmail } from "@/lib/magic/utils";
import { signIn } from "next-auth/react";

const signInWithEmail = async (email: string) => {
  const didToken = await authenticateEmail(email);
  await signIn("credentials", { didToken });
};

export { signInWithEmail };
