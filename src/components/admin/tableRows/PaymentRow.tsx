"use client";
import { FaTrash } from "react-icons/fa6";
import DeleteModal from "@/components/restaurant/ConfirmModal";
import { toast } from "sonner";
import { AdvertiserAccount, Payment } from "@prisma/client";
import { TableCell, TableRow } from "@/components/ui/table";
import { plansI18n } from "@/constants/plansI18n";
import { plans } from "@/constants/plans";
import { deletePayment } from "@/actions/payments/deletePayment";
import { revalidateRoute } from "@/actions/revalidateRoute";
import { usePathname } from "next/navigation";

interface PaymentProps extends Payment {
  AdvertiserAccount: AdvertiserAccount;
}

interface AdRowProps {
  payment: PaymentProps;
}

const PaymentRow = ({ payment }: AdRowProps) => {
  const pathname = usePathname();

  const handleDelete = async () => {
    try {
      await deletePayment({ id: payment.id });

      toast.success("Anúncio deletado");

      revalidateRoute({ fullPath: pathname });
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    }
  };

  return (
    <TableRow>
      <TableCell>{payment?.AdvertiserAccount?.name}</TableCell>

      <TableCell>{plansI18n[payment?.AdvertiserAccount?.plan]}</TableCell>

      <TableCell>{plans[payment?.AdvertiserAccount?.plan]}</TableCell>

      <TableCell>{payment?.createdAt.toLocaleDateString()}</TableCell>

      <TableCell>
        <DeleteModal
          action={handleDelete}
          dialogTitle="Deletar pagamento"
          triggerText={<FaTrash />}
          dialogDescription={
            <>
              <p>
                Você está apagando o anúncio:{" "}
                <span className="text-red-500">{payment.id}</span>
              </p>
              <p>Deseja continuar?</p>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default PaymentRow;
