import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GooglePovider from "next-auth/providers/google";
import prisma from "@/lib/prisma";

export const nextAuthOptions = {
  providers: [
    GooglePovider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
};
