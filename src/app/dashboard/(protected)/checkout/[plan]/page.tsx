import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CheckoutCreditCard from "@/components/checkout/CheckoutCreditCard";
import { createUpdateStripeCustomer } from "@/actions/paymentProfile/createUpdateStripeCustomer";
import { User } from "@prisma/client";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Finalize sua compra",
};

interface CheckoutPageProps {
  params: {
    plan: string;
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  const primaryEmail = clerkUser.emailAddresses.find(email => email.id === clerkUser.primaryEmailAddressId);
  if (!primaryEmail) {
    throw new Error("User has no primary email address");
  }

  // Get the full plan from Prisma directly since we need all fields
  const plan = await prisma.plan.findUnique({
    where: {
      id: params.plan,
    },
  });

  if (!plan) {
    redirect("/dashboard/plans");
  }

  // Create a User object from Clerk user data
  const user: User = {
    id: clerkUser.id,
    name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || null,
    email: primaryEmail.emailAddress,
    emailVerified: null,
    profileImage: clerkUser.imageUrl,
    customerId: null,
    stripeId: null,
    clerkId: clerkUser.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "USER",
  };

  const customer = await createUpdateStripeCustomer({
    user,
    data: {
      name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
      email: primaryEmail.emailAddress,
      cpfCnpj: "",
      postalCode: "",
      addressNumber: "",
      addressComplement: null,
      mobilePhone: clerkUser.phoneNumbers?.[0]?.phoneNumber || "",
      address: "",
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <CheckoutCreditCard
        customer={customer}
        plan={plan}
        user={user}
      />
    </div>
  );
}
