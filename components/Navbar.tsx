import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <div className="container flex justify-end p-4 border-b border-border">
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
