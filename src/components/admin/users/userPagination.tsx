import { fetchManyUsers } from "@/actions/user/fetchManyUsers";
import Paginate from "@/components/misc/Pagination";
import UserCard from "../adminCards/User";
import { Separator } from "@/components/ui/separator";
import SearchField from "@/components/misc/SearchField";
import { Prisma } from "@prisma/client";

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
      <div className="w-full h-full py-10 flex gap-5 flex-col">
        <div className="flex justify-between w-full gap-5 items-center">
          <p className="text-2xl">Usuários</p>
          <SearchField keyName="name" placeholder="Busque um nome" />
        </div>

        <Separator />

        <div className="flex flex-col gap-5 h-[calc(100svh-220px)] overflow-y-auto">
          {users.map((user) => (
            <UserCard user={user} key={user.id} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex items-center bg-background">
        <Paginate pages={pages} current={page} />
      </div>
    </>
  );
};

export default UserPagination;
