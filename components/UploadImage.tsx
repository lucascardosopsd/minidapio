import { ChangeEvent } from "react";
import { Input } from "./ui/input";
import Image from "next/image";

interface UploadImageProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  imageFile?: string;
  logoUrl?: string;
  defaultTitle: string;
  activeTitle: string;
}

const UploadImage = ({
  onChange,
  imageFile,
  logoUrl,
  defaultTitle,
  activeTitle,
}: UploadImageProps) => {
  return (
    <div className="relative">
      <Input
        type="file"
        accept="image/*"
        id="logo"
        onChange={onChange}
        className="hidden"
      />

      <label
        htmlFor="logo"
        className={`flex w-full h-80 border border-dashed relative items-center justify-center hover:border-primary transition cursor-pointer rounded ${
          imageFile && "border-primary"
        }`}
      >
        <p className="absolute bg-background z-10 p-2 text-primary rounded">
          {imageFile ? activeTitle : defaultTitle}
        </p>
        {(imageFile || logoUrl) && (
          <Image
            height={0}
            width={0}
            src={(imageFile || logoUrl) ?? ""}
            alt="logo"
            sizes="1000px"
            className="h-full w-full absolute left-0 top-0 rounded object-cover"
          />
        )}
      </label>
    </div>
  );
};

export default UploadImage;
