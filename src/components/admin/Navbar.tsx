import { ThemeToggle } from "../misc/ThemeToggle";
import { Avatar, AvatarImage } from "../ui/avatar";
import { fetchUser } from "@/actions/user/fetchUser";
import { useUserSession } from "@/hooks/useUserSession";

const Navbar = async () => {
  const session = await useUserSession();

  const user = await fetchUser({ email: session?.email! });

  return (
    <div className="container flex justify-end items-center p-4 border-b border-border h-16">
      <div className="flex gap-2 items-center">
        <ThemeToggle />
        <Avatar>
          <AvatarImage src={user?.image!} />
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
