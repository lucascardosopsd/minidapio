import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  content: string | ReactNode;
}

const StatsCard = ({
  title,
  description,
  icon: Icon,
  content,
}: StatsCardProps) => {
  return (
    <Card className="flex-1 min-w-[250px]">
      <CardHeader>
        <div className="flex justify-between gap-5">
          <p>{title}</p>
          {Icon && <Icon className="text-mutted" />}
        </div>

        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default StatsCard;
