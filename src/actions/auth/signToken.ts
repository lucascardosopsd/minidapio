"use server";

import jwt from "jsonwebtoken";

export const signToken = async ({ data }: { data: Object }) => {
  return jwt.sign(data, process.env.SECRET!, {
    expiresIn: "1h",
  });
};
