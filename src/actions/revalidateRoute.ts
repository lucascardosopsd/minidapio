"use server";

import { revalidatePath } from "next/cache";

export const revalidateRoute = ({ fullPath }: { fullPath: string }) => {
  revalidatePath(fullPath);
};
