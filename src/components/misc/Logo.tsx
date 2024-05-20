import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/logo.svg"
      height={500}
      width={500}
      alt="Logo"
      className="w-32 h-32"
    />
  );
};

export default Logo;
