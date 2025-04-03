"use client";
import Image from "next/image";
import { FC } from "react";

interface ProfileImageViewProps {
  imageUrl: string | null;
}

const ProfileImageView: FC<ProfileImageViewProps> = ({ imageUrl }) => {
  return (
    <div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Profilbild"
          className="w-20 h-10 object-cover rounded-full  "
          width={80}
          height={80}
        />
      ) : (
        <p>No image</p>
      )}
    </div>
  );
};

export default ProfileImageView;
