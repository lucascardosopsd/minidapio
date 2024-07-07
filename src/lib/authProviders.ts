import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (user && user.password && credentials?.password) {
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isValid) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
};
