import { fetchManyUsers } from "@/actions/user/fetchManyUsers";
import Paginate from "@/components/misc/Pagination";
import UserCard from "../Cards/User";
import { Separator } from "@/components/ui/separator";

interface UserPaginationprops {
  page: number;
}

const UserPagination = async ({ page }: UserPaginationprops) => {
  const { users, pages } = await fetchManyUsers({ page: page - 1, take: 2 });

  return (
    <>
      <div className="flex flex-col gap-5 w-full h-full py-10 h-[calc(100svh-120px)]">
        <p className="text-2xl">Usuários</p>

        <Separator />

        {users.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full flex items-center bg-background">
        <Paginate pages={pages} current={page} />
      </div>
    </>
  );
};

export default UserPagination;
