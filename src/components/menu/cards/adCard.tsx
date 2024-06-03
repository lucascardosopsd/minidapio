import { createClick } from "@/actions/createClick";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ad } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface AdCardProps {
  ad: Ad;
}

const AdCard = ({ ad }: AdCardProps) => {
  const handleClick = async () => {
    try {
      await createClick({ adId: ad.id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardContent className="flex flex-col p-0">
        <Image
          src={ad.image}
          height={500}
          width={500}
          alt="Anúncio"
          className="w-full h-full rounded object-cover"
        />
        <div className="flex flex-col gap-2 p-5">
          <p className="text-xs text-muted-foreground">Anúncio</p>
          <p className="font-semibold">{ad.title}</p>
          <p className="text-xs">{ad.description}</p>
        </div>

        {ad.link && (
          <Link href={ad.link} target="_blank">
            <Button className="w-full bg-foreground" onClick={handleClick}>
              Saiba mais
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default AdCard;
