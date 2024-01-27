import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <div className="container flex justify-end p-4 border-b border-border h-16">
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
