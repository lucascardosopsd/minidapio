"use client";
import { FaPen, FaTrash } from "react-icons/fa6";
import DeleteModal from "@/components/restaurant/ConfirmModal";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/tools/copyToClipboard";
import { useState } from "react";
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
import { plansI18n } from "@/constants/plansI18n";

interface AdvertiserRowProps {
  advertiser: AdvertiserAccount;
  user: User;
  afiliate: Afiliate | null;
}

const AdvertiserRow = ({ advertiser, user, afiliate }: AdvertiserRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteAdvertiserAccount({ accountId: advertiser.id });

      toast.success("Anúncio deletado");

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    } finally {
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
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <TableRow>
      <TableCell>{advertiser?.name}</TableCell>

      <TableCell>{plansI18n[advertiser?.plan]}</TableCell>

      <TableCell>{afiliate?.name ?? "Desconhecido"}</TableCell>

      <TableCell>
        <Button
          size="icon"
          onClick={() => copyToClipboard(user?.id!, "", "Id copiado!")}
          className="right-5 top-5"
          variant="secondary"
        >
          ID
        </Button>
      </TableCell>

      <TableCell>
        <ReusableDialog
          title="Editar anunciante"
          trigger={<FaPen />}
          content={
            <AdminAdvertiserProfileForm
              defaultValues={advertiser}
              userData={user}
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
          dialogTitle="Apagar afiliado"
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
