"use client";
import { useAuth } from "@/context/AuthContext";
import { db, storage } from "@/firebaseConfig";
import { CameraIcon } from "@heroicons/react/24/outline";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";

const ProfileImage: FC<{
  userId: string;
  isEditing: boolean;
  size?: number;
}> = ({ userId, isEditing, size = 32 }) => {
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user?.uid) {
      const fetchProfileImage = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setImageUrl(userDoc.data().profileImage || "/noImage.svg");
        }
      };
      fetchProfileImage();
    }
  }, [user?.uid]);

  // Hantera filändringar
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  // Ladda upp bilden
  const uploadProfileImage = async () => {
    if (profileImage && user?.uid) {
      const imageRef = ref(
        storage,
        `profile-images/${user.uid}_${profileImage.name}`
      );

      await uploadBytes(imageRef, profileImage);

      const url = await getDownloadURL(imageRef);

      await setDoc(
        doc(db, "users", user.uid),
        { profileImage: url },
        { merge: true }
      );

      setImageUrl(url);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Profilbild"
          className="rounded-full object-cover"
          style={{ width: size, height: size }}
          width={50}
          height={50}
        />
      ) : (
        <div>
          <Image src="/noImage.svg" alt="no image" width={50} height={50} />
          <p>Ingen bild vald</p>
        </div>
      )}

      {isEditing && (
        <div className="flex flex-col mt-4">
          <button
            onClick={triggerFileInput}
            className="flex justify-center text-gray-600 hover:text-gray-800 "
          >
            <CameraIcon className="w-8 h-8" />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {profileImage && (
            <button
              onClick={uploadProfileImage}
              className="border-primary border-2 p-2 rounded-lg"
            >
              Ladda upp bild
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
