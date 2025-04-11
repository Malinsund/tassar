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

import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

interface Post {
  id: string;
  userId: string;
  username: string;
  userProfileImage: string;
  imageUrl: string;
  description: string;
  timestamp: string;
  postComments: { text: string; username: string }[];
}
interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostAdded: (newPost: Post) => void;
}

const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  onClose,
  onPostAdded,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [, setPostImageUrl] = useState<string | null>(null);
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

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    if (files && files[0]) {
      setImage(files[0]);
      console.log("Släppt bild:", files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
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

      const newPost: Post = {
        userId: user?.uid ?? "unknown",
        username: user?.username || "Okänd användare",
        userProfileImage: userProfileImage || "/noImage.svg",
        imageUrl: uploadedImageUrl,
        description,
        id: "",
        timestamp: new Date().toISOString(),
        postComments: [],
      };

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      const result = await response.json();
      if (response.ok) {
        onPostAdded({
          ...newPost,
          id: result.id,
          timestamp: new Date().toISOString(),
        });
        onClose();
        setImage(null);
        setPostImageUrl(null);
        setDescription("");
      } else {
        alert(`Fel: ${result.error}`);
      }
    } catch (error) {
      console.error("Fel vid uppladdning:", error);
      alert("Det gick inte att ladda upp inlägget.");
    }

    setLoading(false);
  };

  const handleClose = () => {
    setImage(null);
    setPostImageUrl(null);
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  const imagePreviewUrl = image ? URL.createObjectURL(image) : null;

  return (
    <div className="fixed inset-0 dark:text-black bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Nytt inlägg</h2>

        {/* Drag-and-drop område */}
        <div
          className="border-2 border-dashed p-4 text-center text-gray-500 rounded-md cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {image ? (
            <>
              <p className="text-sm text-gray-500 mt-2">Vald bild:</p>
              <div className="flex justify-center items-center">
                <Image
                  src={imagePreviewUrl!}
                  alt="Förhandsgranskning"
                  width={100}
                  height={100}
                  className="mt-4 max-h-48 object-contain rounded-lg"
                />
              </div>
            </>
          ) : (
            <>
              <label className="block relative cursor-pointer">
                <p>Släpp en bild här eller klicka för att välja en bild</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute left-0 top-0 w-full h-full opacity-0"
                />
              </label>
            </>
          )}
        </div>

        {/* Beskrivning */}
        <textarea
          placeholder="Skriv en beskrivning..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-4 p-2 border border-gray-300 rounded"
        />

        {/* Knappar */}
        <div className="mt-4 flex justify-between">
          <SecondaryButton onClick={handleClose} text="stäng" />

          <PrimaryButton
            text={loading ? "Laddar upp..." : "Lägg upp"}
            onClick={handlePostSubmit}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};
export default PostModal;
