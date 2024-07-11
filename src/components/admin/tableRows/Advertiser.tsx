"use client";
import { FaPen, FaTrash } from "react-icons/fa6";
import DeleteModal from "@/components/restaurant/ConfirmModal";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/tools/copyToClipboard";
import { useEffect, useState } from "react";
import { AdvertiserAccount, Afiliate, User } from "@prisma/client";
import ReusableDialog from "@/components/misc/ReusableDialog";
import { toast } from "sonner";
import { deleteAdvertiserAccount } from "@/actions/advertiser/deleteAdvertiser";
import AdminAdvertiserProfileForm from "../forms/AdvertiserProfile";
import { z } from "zod";
import { adminAdvertiserProfile } from "@/validators/adminAdvertiserProfile";
import axios from "axios";
import { CustumerProps, CustumersArrayProps } from "@/types/asaas";
import { getAdvertiserAccount } from "@/actions/advertiser/getAdvertiserAccount";
import { updateAdvertiserAccount } from "@/actions/advertiser/updateAdvertiserAccount";
import { createAdvertiserAccount } from "@/actions/advertiser/createAccount";
import { updateUser } from "@/actions/user/updateUser";
import { TableCell, TableRow } from "@/components/ui/table";
import { revalidateRoute } from "@/actions/revalidateRoute";
import { usePathname } from "next/navigation";
import { checkMonthlyPayment } from "@/actions/payments/checkMonthlyPayment";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";

interface AdvertiserWithPaidProps extends AdvertiserAccount {
  user: User;
  paid: boolean;
}

interface AdvertiserRowProps {
  advertiser: AdvertiserWithPaidProps;
  afiliate: Afiliate | null;
}

const AdvertiserRow = ({ advertiser, afiliate }: AdvertiserRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const pathname = usePathname();

  const handleCheckPayment = async () => {
    let hasPaidRes = await checkMonthlyPayment({ userId: advertiser.userId });
    setHasPaid(hasPaidRes);
  };

  const handleDelete = async () => {
    try {
      await deleteAdvertiserAccount({ accountId: advertiser.id });

      toast.success("Anunciante deletado");

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    } finally {
      revalidateRoute({ fullPath: pathname });
    }
  };

  const createUserAdvertiserAcccount = async ({
    advertiserData,
    userData,
  }: {
    advertiserData: z.infer<typeof adminAdvertiserProfile>;
    userData: User;
  }) => {
    const newAdAccount = await createAdvertiserAccount({
      data: advertiserData,
    });

    await updateUser({
      id: userData.id,
      data: {
        advertiserAccountId: newAdAccount.id,
      },
    });
  };

  const handleSubmit = async (
    data: z.infer<typeof adminAdvertiserProfile>,
    userData: User
  ) => {
    setLoading(true);

    try {
      const { data: getRes } = await axios.get<CustumersArrayProps>(
        "/api/asaas/customer"
      );

      const customers = getRes.data;

      const checkCostumer = customers.find(
        (costumer) => costumer.email == userData.email
      );

      if (!checkCostumer) {
        const { data: newCustomer } = await axios.post("/api/asaas/customer", {
          name: data.name,
          cpfCnpj: data.cpfCnpj,
          mobilePhone: data.phone,
          email: userData.email,
        });

        if (!newCustomer.customer.id) throw new Error("Costumer id not found");

        data.customerId = newCustomer.customer.id;

        const checkAccount = await getAdvertiserAccount({
          userId: userData.id,
        });

        if (!checkAccount) {
          await createUserAdvertiserAcccount({
            advertiserData: data,
            userData: userData,
          });
        } else {
          await updateAdvertiserAccount({ userId: userData.id, data: data });
        }
      } else {
        await axios.put<CustumerProps>(
          `/api/asaas/customer/${checkCostumer.id}`,
          {
            name: data.name,
            cpfCnpj: data.cpfCnpj,
            mobilePhone: data.phone,
            email: userData.email,
          }
        );

        const checkAccount = await getAdvertiserAccount({
          userId: userData.id,
        });

        if (!checkAccount) {
          await createUserAdvertiserAcccount({
            advertiserData: data,
            userData: userData,
          });
        } else {
          await updateAdvertiserAccount({ userId: userData.id, data: data });
        }
      }

      toast.success("Salvo com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    } finally {
      revalidateRoute({
        fullPath: pathname,
      });
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    handleCheckPayment();
  }, []);

  return (
    <TableRow>
      <TableCell>{advertiser?.name}</TableCell>

      <TableCell>{afiliate?.name || "Desconhecido"}</TableCell>

      <TableCell>
        <Badge className="w-full">
          <p className="text-center w-full">
            {hasPaid ? "Em dia" : "Atrasado"}
          </p>
        </Badge>
      </TableCell>

      <TableCell>
        <Button
          size="icon"
          onClick={() => copyToClipboard(advertiser.userId, "", "Id copiado!")}
          className="right-5 top-5"
          variant="secondary"
        >
          <Copy size={16} />
        </Button>
      </TableCell>

      <TableCell>
        <ReusableDialog
          title="Editar anunciante"
          trigger={<FaPen />}
          content={
            <AdminAdvertiserProfileForm
              defaultValues={advertiser}
              userData={advertiser.user}
              onSubmit={handleSubmit}
              loading={loading}
            />
          }
          isOpen={isModalOpen}
          onOpen={setIsModalOpen}
        />
      </TableCell>

      <TableCell>
        <DeleteModal
          action={handleDelete}
          dialogTitle="Apagar anunciante"
          triggerText={<FaTrash />}
          dialogDescription={
            <>
              <p>
                Você está apagando o usuário:{" "}
                <span className="text-red-500">{advertiser?.name}</span>
              </p>
              <p>Deseja continuar?</p>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default AdvertiserRow;
