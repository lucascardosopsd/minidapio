"use server";

import { fetchUserSubscriptions } from "./fetchUserSubscriptions";
import moment from "moment";

interface CheckMonthlyPaymentProps {
  userId: string;
}

export const checkMonthlySubscription = async ({
  userId,
}: CheckMonthlyPaymentProps) => {
  const userPayments = await fetchUserSubscriptions({ userId });

  return !!moment().diff(moment(userPayments[0]?.createdAt, "months", true));
};
