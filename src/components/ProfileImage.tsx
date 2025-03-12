"use client";
import { useProfile } from "@/context/ProfileContext";
import { db, storage } from "@/firebaseConfig"; // Importera Firebase-konfigurationen
import { CameraIcon } from "@heroicons/react/24/outline";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";

// Komponent för att hantera profilbilden
export default function ProfileImage({
  userId,
  isEditing,
}: {
  userId: string;
  isEditing: boolean;
}) {
  const { imageUrl, setImageUrl } = useProfile();
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadProfileImage = async () => {
    if (profileImage) {
      const imageRef = ref(storage, `profile-images/${profileImage.name}`);
      await uploadBytes(imageRef, profileImage);

      const url = await getDownloadURL(imageRef);

      await setDoc(
        doc(db, "users", userId),
        { profileImage: url },
        { merge: true }
      );

      setImageUrl(url);
    }
  };

  return (
    <div className="">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Profilbild"
          className="rounded-full w-32 h-32 m-4"
        />
      ) : (
        <div>
          <img src="/noImage.svg" alt="no image" />
          <p>Ingen bild vald</p>
        </div>
      )}
      {isEditing && (
        <div className="flex mt-4">
          <button
            onClick={triggerFileInput}
            className="text-gray-600 hover:text-gray-800"
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
            <button onClick={uploadProfileImage}>Ladda upp bild</button>
          )}
        </div>
      )}
    </div>
  );
}
