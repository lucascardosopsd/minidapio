"use client";

import { Avatar, AvatarImage } from "../ui/avatar";
import { UploadButton } from "./UploadThing";

interface ProfilePictureProps {
  profileImage: string;
  onChange: (...event: any[]) => void;
  onUploading?: (isUploading: boolean) => void;
}

const ProfilePicture = ({
  profileImage,
  onChange,
  onUploading,
}: ProfilePictureProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex mt-4 flex-col justify-center">
        {profileImage ? (
          <Avatar className="h-20 w-20 relative cursor-pointer hover:border hover:border-primary transition">
            <UploadButton
              onUploadBegin={() => {
                onUploading && onUploading(true);
              }}
              onUploadProgress={() => {
                onUploading && onUploading(false);
              }}
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                onChange(res[0].url);
              }}
              className="absolute opacity-0 m-auto h-full w-full"
              appearance={{
                button: "absolute h-full m-auto bg-blue-500 opacity-0",
              }}
            />
            <AvatarImage src={profileImage} />
          </Avatar>
        ) : (
          <></>
        )}
      </div>

      <p className="text-xs text-zinc-600 text-center mt-2">
        Clique sobre a imagem para substituir
      </p>
    </div>
  );
};

export default ProfilePicture;
