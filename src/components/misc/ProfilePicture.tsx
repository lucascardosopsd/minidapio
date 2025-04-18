'use client';

import { Avatar, AvatarImage } from '../ui/avatar';
import { UploadButton } from './UploadThing';

interface ProfilePictureProps {
  profileImage: string;
  onChange: (...event: any[]) => void;
  onUploading?: (isUploading: boolean) => void;
}

const ProfilePicture = ({ profileImage, onChange, onUploading }: ProfilePictureProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-4 flex flex-col justify-center">
        {profileImage ? (
          <Avatar className="relative h-20 w-20 cursor-pointer transition hover:border hover:border-primary">
            <UploadButton
              onUploadBegin={() => {
                onUploading && onUploading(true);
              }}
              onUploadProgress={() => {
                onUploading && onUploading(false);
              }}
              endpoint="imageUploader"
              onClientUploadComplete={res => {
                onChange(res[0]?.ufsUrl);
              }}
              className="absolute m-auto h-full w-full opacity-0"
              appearance={{
                button: 'absolute h-full m-auto bg-blue-500 opacity-0',
              }}
            />
            <AvatarImage src={profileImage ?? ''} />
          </Avatar>
        ) : (
          <></>
        )}
      </div>

      <p className="mt-2 text-center text-xs text-zinc-600">
        Clique sobre a imagem para substituir
      </p>
    </div>
  );
};

export default ProfilePicture;
