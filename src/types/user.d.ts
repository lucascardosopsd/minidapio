import { AdvertiserAccount, User } from "@prisma/client";

export interface UserAdAccountProps extends User {
  AdvertiserAccount: AdvertiserAccount | null;
}
