"use client";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import ProfileDescription from "@/components/ProfileDescription";
import ProfileImage from "@/components/ProfileImage";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { db } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user } = useAuth();
  const { imageUrl, setImageUrl } = useProfile();
  const [description, setDescription] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Hämta användardata vid inladdning
  useEffect(() => {
    const getUserData = async () => {
      if (user?.uid) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setImageUrl(data.profileImage || null);
          setDescription(data.description || null);
          setUsername(data.username || "Användarnamn inte tillgängligt"); // Fyll i användarnamn
        } else {
          console.log("Användardokumentet finns inte.");
        }
      }
    };

    getUserData();
  }, [user]);
  if (!user) {
    return <p>Logga in för att se din profil</p>;
  }
  const saveAllChanges = async () => {
    if (isEditing) {
      await setDoc(
        doc(db, "users", user?.uid || ""),
        { description },
        { merge: true }
      );
      if (imageUrl) {
        await setDoc(
          doc(db, "users", user?.uid || ""),
          { profileImage: imageUrl },
          { merge: true }
        );
      }
    }
  };

  return (
    <div>
      <Header imageUrl={imageUrl} />
      <Navbar />
      <div className="grid grid-cols-4 gap-2">
        <div className="flex flex-col justify-center text-center items-center bg-slate-300 col-span-1 p-4 gap-2">
          <ProfileImage userId={user.uid} isEditing={isEditing} />
          {username && <h2 className="text-2xl font-bold">@{username}</h2>}

          <ProfileDescription
            userId={user?.uid || ""}
            description={description}
            setDescription={setDescription}
            username={username}
            isEditing={isEditing}
            saveAllChanges={saveAllChanges}
          />
          <PrimaryButton
            onClick={() => {
              setIsEditing(!isEditing);
              if (!isEditing) {
                saveAllChanges();
              }
            }}
            text={isEditing ? "Spara" : "Redigera profil"}
          />
        </div>
        <div className="bg-blue-100 col-span-2">
          <h1>bilder</h1>
          {/* bild containern */}
        </div>
        <div className="bg-pink-300 col-span-1">
          <h1>meddelanden</h1>
          {/* meddelande containern vid stort fönster */}
        </div>
      </div>
    </div>
  );
}
