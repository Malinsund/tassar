"use client";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/Secondarybutton";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostAdded: (newPost: any) => void;
}

export default function PostModal({
  isOpen,
  onClose,
  onPostAdded,
}: PostModalProps) {
  const [image, setImage] = useState<File | null>(null);
  const [postImageUrl, setPostImageUrl] = useState<string | null>(null);
  const { imageUrl: userProfileImage } = useProfile();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      console.log("Vald bild:", event.target.files[0]);
    }
  };

  const uploadImageToStorage = async () => {
    if (!image) return null;

    const storage = getStorage();
    const storageRef = ref(storage, `post-images/${image.name}-${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  };

  const handlePostSubmit = async () => {
    if (!image || !description) {
      alert("Både bild och beskrivning måste fyllas i!");
      return;
    }

    setLoading(true);

    try {
      const uploadedImageUrl = await uploadImageToStorage();
      if (!uploadedImageUrl)
        throw new Error("Misslyckades att ladda upp bilden");

      setPostImageUrl(uploadedImageUrl);

      const newPost = {
        userId: user?.uid,
        username: user?.username || "Okänd användare",
        userProfileImage: userProfileImage || "/noImage.svg",
        imageUrl: uploadedImageUrl,
        description,
      };
      console.log("skickar till servern", newPost);

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      const result = await response.json();
      console.log("svarfrån servern:", result);
      if (response.ok) {
        onPostAdded({
          id: result.id,
          ...newPost,
          timestamp: new Date().toString(),
        });
        onClose();
      } else {
        alert(`Fel: ${result.error}`);
      }
    } catch (error) {
      console.error("Fel vid uppladdning:", error);
      alert("Det gick inte att ladda upp inlägget.");
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Nytt inlägg</h2>

        {/* Bilduppladdning */}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && (
          <p className="text-sm text-gray-500 mt-2">Bild vald: {image.name}</p>
        )}

        {/* Beskrivning */}
        <textarea
          placeholder="Skriv en beskrivning..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-4 p-2 border border-gray-300 rounded"
        />

        {/* Knappar */}
        <div className="mt-4 flex justify-between">
          <SecondaryButton onClick={onClose} text="stäng" />

          <PrimaryButton
            text={loading ? "Laddar upp..." : "Lägg upp"}
            onClick={handlePostSubmit}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
