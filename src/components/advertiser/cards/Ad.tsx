"use client";
import ReusableDialog from "@/components/misc/ReusableDialog";
import { Card, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { AdProps } from "@/types/ad";
import { updateAd } from "@/actions/ad/updateAd";
import { toast } from "sonner";
import { revalidateRoute } from "@/actions/revalidateRoute";
import Image from "next/image";
import { Power } from "lucide-react";

interface AdCardProps {
  ad: AdProps;
}

const AdCard = ({ ad }: AdCardProps) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateAd = async () => {
    try {
      setLoading(true);

      await updateAd({
        id: ad.id,
        data: {
          active: !ad.active,
        },
      });

      revalidateRoute({ fullPath: "/admin/dashboard" });

      toast.success("Anúncio atualizado");

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex gap-5">
          <Image
            src={ad.image}
            width={300}
            height={300}
            alt={ad.title}
            className="w-[150px] h-[80px] rounded border-2 object-cover"
          />
          <div className="flex items-center">{ad.title}</div>
        </div>

        <div className="flex gap-5">
          <ReusableDialog
            onSubmit={handleUpdateAd}
            loading={loading}
            onOpen={setIsModalOpen}
            isOpen={isModalOpen}
            title={ad.active ? "Desativar anuncio" : "Ativar anuncio"}
            trigger={<Power />}
            triggerVariant={ad.active ? "default" : "outline"}
            content={
              <div className="h-full w-full flex flex-col justify-center">
                <p>
                  {ad.active
                    ? "Você está desativando o anúncio:"
                    : "Você está ativando o anúncio:"}{" "}
                  <span className="text-red-500 font-bold">{ad.title}</span>
                </p>
                <p>Deseja continuar?</p>
              </div>
            }
          />
        </div>
      </CardHeader>
    </Card>
  );
};

export default AdCard;
