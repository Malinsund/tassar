"use client";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // AuthContext för autentisering

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostModal({ isOpen, onClose }: PostModalProps) {
  const [image, setImage] = useState<string | null>(null); // För lagring av bild-URL
  const [description, setDescription] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, `post-images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Hantera uppladdningens framsteg här om du vill
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImage(downloadURL);
          });
        }
      );
    }
  };

  const handlePostSubmit = async () => {
    if (!image || !description) {
      alert("Både bild och beskrivning måste fyllas i!");
      return;
    }

    const userUid = user?.uid;
    if (!userUid) {
      alert("Du måste vara inloggad för att lägga upp ett inlägg.");
      return;
    }

    const postData = {
      description,
      imageUrl: image,
      userId: userUid,
    };

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Inlägg uppladdat!");
        onClose();
        router.push("/posts");
      } else {
        alert(`Fel: ${result.message}`);
      }
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("Det gick inte att ladda upp inlägget.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Lägg upp nytt inlägg</h2>

        {/* Bilduppladdning */}
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {/* Förhandsgranskning av bild */}
        {image && (
          <div className="relative w-64 h-64 border-2 border-gray-300 overflow-hidden mt-4">
            <img
              src={image}
              alt="Uploaded"
              className="object-cover w-full h-full"
            />
          </div>
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
          <button
            onClick={onClose}
            className="bg-gray-400 text-white p-2 rounded"
          >
            Ångra
          </button>
          <button
            onClick={handlePostSubmit}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Lägg upp
          </button>
        </div>
      </div>
    </div>
  );
}
