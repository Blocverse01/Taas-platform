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
    strategy: "jwt",
    maxAge: 7 * 60 * 60, // 7 hours
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the user id to the token right after signin
      if (account) {
        token.id = account.providerAccountId;
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id

      return session
    }
  }
};
const handler = NextAuth(authOptions);

export default handler;
