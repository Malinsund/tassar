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
          className="w-20 h-10 object-cover rounded-full  "
        />
      ) : (
        <p>No image</p>
      )}
    </div>
  );
};

export default ProfileImageView;
