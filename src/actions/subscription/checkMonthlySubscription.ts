"use server";
import { fetchPaymentsByQuery } from "../payment/fetchPaymentsByQuery";
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
  lastPayMethod: string | "PIX" | "CREDIT_CARD";
}

export const checkMonthlySubscription = async ({
  userId,
}: CheckMonthlyPaymentProps): Promise<CheckMonthlyPaymentReturnProps> => {
  const user = await fetchUser({ id: userId });
  const subscriptions = await fetchUserSubscriptions({ userId });

  const { payments } = await fetchPaymentsByQuery({
    page: 0,
    take: 1,
    query: {
      where: {
        userId: user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    },
  });

  const trialRemaining = moment(user?.createdAt)
    .add(1, "month")
    .diff(moment(), "day");

  if (
    (trialRemaining >= 0 && !subscriptions.length && payments.length >= 0) ||
    (trialRemaining >= 0 && !payments.length && payments.length >= 0)
  ) {
    return {
      type: "trial",
      lastPayMethod: "CREDIT_CARD",
      remaining: trialRemaining,
      subscription: null,
    };
  }

  if (!subscriptions.length) {
    return {
      type: "paid",
      remaining: null,
      subscription: null,
      lastPayMethod: payments[0] ? "CREDIT_CARD" : "PIX",
    };
  }

  const paidRemaining = moment(payments[0]?.createdAt)
    .add(1, "month")
    .diff(moment(), "day");

  if (paidRemaining < 0) {
    return {
      type: "paid",
      remaining: null,
      subscription: subscriptions[0] || null,
      lastPayMethod: payments[0] ? "CREDIT_CARD" : "PIX",
    };
  }

  return {
    type: "paid",
    remaining: paidRemaining,
    subscription: subscriptions[0] || null,
    lastPayMethod: payments[0] ? "CREDIT_CARD" : "PIX",
  };
};
