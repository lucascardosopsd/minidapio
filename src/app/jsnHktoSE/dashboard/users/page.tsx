import UserPagination from "@/components/admin/users/UserPagination";

interface UsersPageProps {
  searchParams?: {
    page: string;
    name?: string;
  };
}

const UsersPage = async ({ searchParams }: UsersPageProps) => {
  const page = Number(searchParams?.page || 1);
  const name = searchParams?.name || "";

  return (
    <div className="relative w-full ">
      <UserPagination
        page={page}
        query={
          name
            ? {
                where: {
                  name: {
                    contains: name,
                    mode: "insensitive",
                  },
                },
                orderBy: {
                  name: "asc",
                },
              }
            : {
                orderBy: {
                  name: "asc",
                },
              }
        }
      />
    </div>
  );
};

export default UsersPage;
