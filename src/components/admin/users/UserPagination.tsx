import { fetchManyUsers } from "@/actions/user/fetchManyUsers";
import Paginate from "@/components/misc/Paginate";
import { Separator } from "@/components/ui/separator";
import SearchField from "@/components/misc/SearchField";
import { Prisma } from "@prisma/client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserRow from "../tableRows/User";

export type UserQuery = Prisma.UserFindManyArgs;

interface UserPaginationprops {
  page: number;
  query?: UserQuery;
}

const UserPagination = async ({ page, query }: UserPaginationprops) => {
  const { users, pages } = await fetchManyUsers({
    page: page - 1,
    take: 10,
    query,
  });

  return (
    <>
      <div className="w-full h-[calc(100svh-150px)] flex gap-5 pt-5 flex-col">
        <div className="flex justify-between w-full gap-5 items-center">
          <p className="text-2xl">Usuários</p>
          <SearchField
            keyName="name"
            placeholder="Busque um nome"
            inputClassName="w-64"
          />
        </div>

        <Separator />

        <div className="h-[calc(100svh-100px)] overflow-y-auto w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Foto</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Editar</TableHead>
                <TableHead>Deletar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <UserRow user={user} key={user.id} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="w-full flex items-center bg-background">
        <Paginate pages={pages} current={page} />
      </div>
    </>
  );
};

export default UserPagination;
