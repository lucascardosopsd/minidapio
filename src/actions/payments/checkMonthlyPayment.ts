import { fetchUserPayments } from "./fetchUserPayments";
import moment from "moment";

interface CheckMonthlyPaymentProps {
  userId: string;
}

export const checkMonthlyPayment = async ({
  userId,
}: CheckMonthlyPaymentProps) => {
  const userPayments = await fetchUserPayments({ userId });

  return !!moment().diff(moment(userPayments[0]?.createdAt, "months", true));
};
