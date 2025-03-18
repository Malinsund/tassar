"use client";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import ProfileDescription from "@/components/ProfileDescription";
import ProfileImage from "@/components/ProfileImage";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { db } from "@/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user } = useAuth();
  const { imageUrl, setImageUrl } = useProfile();
  const [description, setDescription] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userImages, setUserImages] = useState<string[]>([]);

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
  useEffect(() => {
    const getUserImages = async () => {
      if (user?.uid) {
        const postsQuery = query(
          collection(db, "posts"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(postsQuery);
        const images: string[] = [];
        querySnapshot.forEach((doc) => {
          const postData = doc.data();
          if (postData.imageUrl) {
            images.push(postData.imageUrl);
          }
        });
        setUserImages(images);
      }
    };

    getUserImages();
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
      <Header />
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        <div className="flex flex-col justify-center text-center items-center bg-slate-300 col-span-1 p-4 gap-2">
          <div className="">
            <ProfileImage userId={user.uid} isEditing={isEditing} />
          </div>
          {username && <h2 className="text-2xl font-bold">@{username}</h2>}

          <ProfileDescription
            userId={user?.uid || ""}
            description={description}
            setDescription={setDescription}
            username={username}
            isEditing={isEditing}
            saveAllChanges={saveAllChanges}
          />
          <div className="flex gap-8">
            <PrimaryButton
              onClick={() => {
                setIsEditing(!isEditing);
                if (!isEditing) {
                  saveAllChanges();
                }
              }}
              text={isEditing ? "Spara" : "Redigera profil"}
            />
            <div className="lg:hidden">
              <PrimaryButton text={"Meddelanden"} />
            </div>
          </div>
        </div>

        <div className="bg-blue-100 col-span-2">
          <h1>bilder</h1>
          {/* bild containern */}
          <div className="grid grid-cols-3 gap-4">
            {userImages.map((image, index) => (
              <div key={index} className="flex justify-center items-center">
                <img
                  src={image}
                  alt={`User Image ${index}`}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-pink-300 col-span-1 hidden lg:block">
          <h1>meddelanden</h1>
          {/* meddelande containern vid stort fönster */}
        </div>
      </div>
    </div>
  );
}
