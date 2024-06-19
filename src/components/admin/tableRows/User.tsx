"use client";

import ReusableModal from "@/components/misc/ReusableModal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { roleI18n } from "@/constants/roleI18n";
import { copyToClipboard } from "@/tools/copyToClipboard";
import { FaPen, FaTrash } from "react-icons/fa6";
import UserForm from "../forms/User";
import DeleteModal from "@/components/restaurant/ConfirmModal";
import { deleteUser } from "@/actions/user/deleteUser";
import { revalidateRoute } from "@/actions/revalidateRoute";
import { toast } from "sonner";
import { updateUser } from "@/actions/user/updateUser";
import { userValidatorSchema } from "@/validators/user";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { User } from "@prisma/client";
import { z } from "zod";

interface UserRowProps {
  user: User;
}

const UserRow = ({ user }: UserRowProps) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();

  const handleUpdateUser = async (
    data: z.infer<typeof userValidatorSchema>
  ) => {
    setLoading(true);
    try {
      await updateUser({ id: user?.id!, data });

      setIsModalOpen(false);

      toast.info("Usuário atualizado");

      revalidateRoute({ fullPath: `${pathname}?${params}` });
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);

    try {
      await deleteUser({ id: user?.id! });

      revalidateRoute({ fullPath: `${pathname}?${params}` });

      toast.success("Usuário deletado");

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableRow className="w-full">
      <TableCell>
        <Avatar>
          <AvatarImage src={user?.image!} />
        </Avatar>
      </TableCell>
      <TableCell>
        <div className="flex items-center w-full flex-1">{user?.name}</div>
      </TableCell>

      <TableCell>
        <div className="flex items-center flex-1 w-full max-w-[200px]">
          [{roleI18n[user?.role!]}]
        </div>
      </TableCell>

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
        <ReusableModal
          title="Editar usuário"
          trigger={<FaPen />}
          content={
            <UserForm
              defaultValues={user!}
              onSubmit={handleUpdateUser}
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
          dialogTitle="Apagar usuário"
          triggerText={<FaTrash />}
          dialogDescription={
            <>
              <p>
                Você está apagando o usuário:{" "}
                <span className="text-red-500">{user?.name}</span>
              </p>
              <p>Deseja continuar?</p>
            </>
          }
        />
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default UserRow;
