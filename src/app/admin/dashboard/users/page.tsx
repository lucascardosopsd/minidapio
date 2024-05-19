import { fetchManyUsers } from "@/actions/user/fetchManyUsers";
import UserCard from "@/components/advertiser/Cards/User";
import { Separator } from "@/components/ui/separator";

interface UsersPageProps {
  params?: {
    page: string;
  };
}

const UsersPage = async ({ params }: UsersPageProps) => {
  const page = Number(params?.page || 0);

  const users = await fetchManyUsers({ page, take: 20 });

  return (
    <div className="flex flex-col gap-5 w-full h-full py-10">
      <p className="text-2xl">Usuários</p>

      <Separator />

      {users.map((user) => (
        <UserCard user={user} />
      ))}
    </div>
  );
};

export default UsersPage;
