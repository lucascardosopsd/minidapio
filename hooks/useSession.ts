"use server"

import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const useSession = async () => {
    return await getServerSession(nextAuthOptions);
}