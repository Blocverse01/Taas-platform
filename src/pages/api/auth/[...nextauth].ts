import { handleAuthRequest } from "@/lib/magic/utils";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    // Credentials with Magic auth
    CredentialsProvider({
      credentials: {
        didToken: {},
      },
      async authorize(credentials, req) {
        if (!credentials) throw new Error("missing credentials");

        const user = await handleAuthRequest(credentials.didToken);
        if (user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  session: {
    maxAge: 7 * 60 * 60, // 7 hours
  },
};
const handler = NextAuth(authOptions);

export default handler;
