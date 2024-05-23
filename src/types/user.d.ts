import { AdvertiserAccount } from "@prisma/client";

export interface UserProps {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: "admin" | "user" | "advertiser";
}

export interface UserPropsWithAdvertiser extends UserProps {
  AdvertiserAccount: AdvertiserAccount;
}
