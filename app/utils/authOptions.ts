import { User } from "next-auth";
import Providers from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    Providers({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        const passwordValid = await bcrypt.compare(
          credentials.password as string,
          user?.password as string
        );

        if (user && passwordValid) {
          console.log(user);

          return {
            ...user,
            id: String(user.id), // Convert id to string
          } as User;
        } else {
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Use strategy instead of jwt
  },
  callbacks: {
    async session({ session, token }) {
      console.log(session);
      console.log(token);

      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: null, // If set, new users will be directed here on first sign in
  },
};
