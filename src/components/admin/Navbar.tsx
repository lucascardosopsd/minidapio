import { ThemeToggle } from "../misc/ThemeToggle";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useUserSession } from "@/hooks/useUserSession";

const Navbar = async () => {
  const user = await useUserSession();

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
