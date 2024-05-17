import ActionBar from "@/components/advertiser/ActionBar";
import { Separator } from "@/components/ui/separator";
import { nextAuthOptions } from "@/lib/authProviders";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

const AdvertiserDashboard = async () => {
  const session = await getServerSession(nextAuthOptions);

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });

  return (
    <section className="w-full h-full pt-5 flex flex-col gap-5">
      <ActionBar isAdmin={!!user && user.role == "admin"} />

      <Separator />
    </section>
  );
};

export default AdvertiserDashboard;
