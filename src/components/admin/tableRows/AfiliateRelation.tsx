"use client";
import { FaTrash } from "react-icons/fa6";
import DeleteModal from "@/components/restaurant/ConfirmModal";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/tools/copyToClipboard";
import {
  AdvertiserAccount,
  Afiliate,
  AfiliateAdvertiserAccount,
} from "@prisma/client";
import { toast } from "sonner";
import { TableCell, TableRow } from "@/components/ui/table";
import { plansI18n } from "@/constants/plansI18n";
import { deleteAfiliateAdvertiserRelation } from "@/actions/AfiliateAdvertiser/deleteAfiliateAdvertiserRelation";
import { usePathname } from "next/navigation";
import { revalidateRoute } from "@/actions/revalidateRoute";

interface RelationProps extends AfiliateAdvertiserAccount {
  advertiserAccount: AdvertiserAccount;
  afiliate: Afiliate;
}

interface AfiliateRelationRowProps {
  relation: RelationProps;
}

const AfiliateRelationRow = ({ relation }: AfiliateRelationRowProps) => {
  const pathname = usePathname();

  const handleDelete = async () => {
    try {
      await deleteAfiliateAdvertiserRelation({ id: relation.id });

      revalidateRoute({ fullPath: pathname });

      toast.success("Relação deletada");
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    } finally {
    }
  };

  return (
    <TableRow>
      <TableCell>{relation.advertiserAccount.name}</TableCell>

      <TableCell>{plansI18n[relation.advertiserAccount.plan]}</TableCell>

      <TableCell>
        <Button
          size="icon"
          onClick={() =>
            copyToClipboard(relation?.id!, "", "Id da relação copiado!")
          }
          className="right-5 top-5"
          variant="secondary"
        >
          ID
        </Button>
      </TableCell>

      <TableCell>
        <DeleteModal
          action={handleDelete}
          dialogTitle="Apagar afiliado"
          triggerText={<FaTrash />}
          dialogDescription={
            <p>
              Você está apagando a relação entre você e
              <span className="text-red-500 mx-2 font-semibold">
                {relation?.advertiserAccount.name}.
              </span>
              Deseja continuar?
            </p>
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default AfiliateRelationRow;
