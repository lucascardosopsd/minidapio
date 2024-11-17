"use client";
import {
  CheckMonthlyPaymentReturnProps,
  checkMonthlySubscription,
} from "@/actions/subscription/checkMonthlySubscription";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";
import { useEffect, useState } from "react";

const UpgradeButton = () => {
  const [currentSub, setCurrentSub] = useState<CheckMonthlyPaymentReturnProps>(
    {} as CheckMonthlyPaymentReturnProps
  );

  const fetchSub = async () => {
    const user = await useCurrentUser();

    if (!user) return;

    const currentSub = await checkMonthlySubscription({ userId: user?.id });

    setCurrentSub(currentSub);
  };

  useEffect(() => {
    fetchSub();
  }, []);

  if (!currentSub) {
    return <></>;
  }

  return (
    <>
      {currentSub.type == "trial" && currentSub.remaining !== null && (
        <Link href="/dashboard/plans">
          <span className="h-10 min-w-10 flex items-center justify-center bg-background border rounded-full border-primary text-sm">
            {currentSub.remaining}
          </span>
        </Link>
      )}

      {(currentSub.type == "trial" && currentSub.remaining == null) ||
        (currentSub.type == "paid" && currentSub.remaining == null && (
          <Link href="/dashboard/plans">
            <span className="h-10 w-40 px-4 flex items-center justify-center bg-background border rounded-full border-primary text-sm">
              {currentSub.lastPayMethod == "PIX"
                ? "Pagamento"
                : "Assinar Plano"}
            </span>
          </Link>
        ))}

      {currentSub.type == "paid" && currentSub.remaining && (
        <Link href="/dashboard/plans">
          <span className="h-10 px-4 flex items-center justify-center bg-background border rounded-full border-primary text-sm">
            {currentSub.subscription?.Plan?.title}
          </span>
        </Link>
      )}
    </>
  );
};

export default UpgradeButton;
