"use client";
import { FC } from "react";

interface ProfileImageViewProps {
  imageUrl: string | null;
}

const ProfileImageView: FC<ProfileImageViewProps> = ({ imageUrl }) => {
  return (
    <div>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Profilbild"
          className="w-full h-full object-cover rounded-full "
        />
      ) : (
        <p>No image</p>
      )}
    </div>
  );
};

export default ProfileImageView;
