"use server";
import { fetchUser } from "../user/fetchUser";
import {
  SubscriptionWithPlan,
  fetchUserSubscriptions,
} from "./fetchUserSubscriptions";
import moment from "moment";

interface CheckMonthlyPaymentProps {
  userId: string;
}

export interface CheckMonthlyPaymentReturnProps {
  type: "trial" | "paid";
  remaining: number | null;
  subscription: SubscriptionWithPlan | null;
}

export const checkMonthlySubscription = async ({
  userId,
}: CheckMonthlyPaymentProps): Promise<CheckMonthlyPaymentReturnProps> => {
  const user = await fetchUser({ id: userId });

  const trialRemaining = moment(user?.createdAt)
    .add(1, "month")
    .diff(moment(), "day");

  if (trialRemaining >= 0) {
    return {
      type: "trial",
      remaining: trialRemaining,
      subscription: null,
    };
  }

  const subscriptions = await fetchUserSubscriptions({ userId });

  if (!subscriptions) {
    return {
      type: "paid",
      remaining: null,
      subscription: null,
    };
  }

  const paidRemaining = moment().diff(
    moment(subscriptions[0]?.createdAt, "months"),
    "day"
  );

  if (paidRemaining < 0) {
    return {
      type: "paid",
      remaining: paidRemaining,
      subscription: subscriptions[0],
    };
  }

  return {
    type: "paid",
    remaining: null,
    subscription: subscriptions[0],
  };
};
