import { createClick } from "@/actions/createClick";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
    <Card className="border-primary">
      <CardContent className="flex p-0">
        <Image
          src={ad.image}
          height={500}
          width={500}
          alt="Anúncio"
          className="rounded-tl-md object-cover flex-1 w-32 h-auto"
        />
        <div className="flex flex-col justify-center gap-2 p-5 flex-[4]">
          <p className="text-xs text-muted-foreground">Anúncio</p>
          <p className="font-semibold text-primary">{ad.title}</p>
          <p className="text-xs ">{ad.description}</p>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        {ad.link && (
          <Link href={ad.link} target="_blank" className="w-full">
            <Button className="w-full rounded-t-none" onClick={handleClick}>
              Saiba mais
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default AdCard;
