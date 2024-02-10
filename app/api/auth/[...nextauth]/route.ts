import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GooglePovider from "next-auth/providers/google";
import prisma from "@/lib/prisma"

export const nextAuthOptions = {
  providers: [
    GooglePovider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
