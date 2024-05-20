import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AdProps } from "@/types/ad";
import Image from "next/image";
import { forwardRef } from "react";

interface AdCardProps {
  ad: AdProps;
}

const AdCard = forwardRef<HTMLDivElement, AdCardProps>(({ ad }, ref) => {
  return (
    <Card ref={ref}>
      <CardContent className="flex flex-col p-0">
        <div className="h-[130px] w-[350px]">
          <Image
            src={ad.image}
            height={500}
            width={500}
            alt="Anúncio"
            className="w-full h-full rounded object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 p-5">
          <p className="text-xs text-muted-foreground">Anúncio</p>
          <p className="font-semibold">{ad.title}</p>
          <p className="text-xs">{ad.description}</p>
        </div>

        {ad.link && (
          <Button className="w-full bg-foreground">Saiba mais</Button>
        )}
      </CardContent>
    </Card>
  );
});

export default AdCard;
