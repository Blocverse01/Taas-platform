import { handleAuthRequest } from "@/lib/magic/utils";
import NextAuth, { AuthOptions, Awaitable } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Address } from "viem";

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
    async jwt({ token, user }) {
      // Persist the user id to the token right after signin

      if (user) {
        token.id = user.id;
        token.walletAddress = user.walletAddress as Address;
      }

      return token
    },
    async session({ session, token }) {
      session.user.id = token.id;

      session.user.walletAddress = token.walletAddress;

      return session
    }
  }
};
const handler = NextAuth(authOptions);

export default handler;
