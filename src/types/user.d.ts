import { AdvertiserAccount } from "@prisma/client";

export interface UserProps extends User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: "admin" | "user" | "advertiser";
  lastPaymentId: string | null;
  advertiserAccountId: string | null;
  afiliateId: string | null;
}

export interface UserAdPaymentProps extends UserProps {
  AdvertiserAccount: AdvertiserAccount | null;
}
