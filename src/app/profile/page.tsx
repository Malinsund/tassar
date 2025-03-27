"use client";

import PrimaryButton from "@/components/buttons/PrimaryButton";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import ProfileImage from "@/components/ProfileImage";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { db } from "@/firebaseConfig";
import { XCircleIcon } from "@heroicons/react/24/outline";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Conversation {
  id: string;
  user1Id: string;
  user2Id: string;
  lastMessage?: string;
  lastTimestamp?: { seconds: number };
  otherUsername?: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const { imageUrl, setImageUrl } = useProfile();
  const [description, setDescription] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userImages, setUserImages] = useState<string[]>([]);
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newDescription, setNewDescription] = useState(description || "");
  const [conversations, setConversations] = useState<Conversation[]>([]);

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
    setNewDescription(description || "");
  }, [description]);

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

  const handleDeleteImage = async () => {
    if (selectedImage && user?.uid) {
      try {
        const postsQuery = query(
          collection(db, "posts"),
          where("userId", "==", user.uid),
          where("imageUrl", "==", selectedImage)
        );
        const querySnapshot = await getDocs(postsQuery);
        querySnapshot.forEach(async (docSnapshot) => {
          await deleteDoc(doc(db, "posts", docSnapshot.id));
        });

        setUserImages(userImages.filter((img) => img !== selectedImage));
        setShowConfirm(false);
      } catch (error) {
        console.error("Fel vid radering:", error);
      }
    }
  };
  const saveAllChanges = async () => {
    console.log("saveAllChanges called");
    if (isEditing) {
      console.log("Saving description: ", newDescription);
      await setDoc(
        doc(db, "users", user?.uid || ""),
        { description: newDescription },
        { merge: true }
      );

      /* if (imageUrl) {
        await setDoc(
          doc(db, "users", user?.uid || ""),
          { profileImage: imageUrl },
          { merge: true }
        );
      } */
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col justify-center align-middle items-center">
        <img src="/tassar.svg" alt="tassar logo" />
        <p className="text-center m-4 text-xl font-special">
          Logga in för att se din profil
        </p>
        <button
          onClick={() => router.push("/")}
          className="rounded bg-primary p-2 text-white shadow-sm w-32 font-special text-xl"
        >
          Logga in
        </button>
      </div>
    );
  }

  return (
    <div className="">
      <Header />
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:h-screen gap-2">
        {/* Profilinformation */}
        <div className="flex flex-col text-center items-center col-span-1 p-4 gap-4 ">
          <div className="">
            <ProfileImage userId={user.uid} isEditing={isEditing} size={240} />
          </div>
          {username && <h2 className="text-2xl font-bold">@{username}</h2>}

          <div>
            {isEditing ? (
              <div>
                <textarea
                  className="rounded-lg border-grey10 w-56 h-24 lg:w-72 p-2"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>
            ) : (
              <p>{description || "Ingen beskrivning satt"}</p>
            )}
          </div>

          <div className="flex lg:mt-8 gap-8">
            <PrimaryButton
              onClick={() => {
                if (isEditing) {
                  saveAllChanges();
                }

                setIsEditing(!isEditing);
              }}
              text={isEditing ? "Spara" : "Redigera profil"}
              className="lg:place-content-end"
            />

            <div className="lg:hidden">
              <PrimaryButton text={"Meddelanden"} />
            </div>
          </div>
        </div>

        {/* Bilder */}
        <div className="border-y-2 lg:border-y-0 lg:border-x-2 p-2 col-span-2 lg:flex-grow h-full">
          <h1>bilder</h1>
          {/* bild containern */}
          <div className="grid grid-cols-4 gap-2">
            {userImages.map((image, index) => (
              <div key={index} className="relative m-2">
                {/* "X"-knappen visas bara i redigeringsläge */}
                {isEditing && (
                  <button
                    className="absolute -top-2 -right-2 "
                    onClick={() => {
                      setSelectedImage(image);
                      setShowConfirm(true);
                    }}
                  >
                    <XCircleIcon className="w-8 h-8 rounded-full fill-white" />
                  </button>
                )}
                <img
                  src={image}
                  alt={`User Image ${index}`}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg text-center">
              <p className="text-xl font-special">
                Är du säker på att du vill ta bort denna bild?
              </p>
              <p className="font-poppins">Denna åtgärd går inte att ångra</p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handleDeleteImage}
                  className="bg-destructive text-white font-special px-4 py-2 rounded"
                >
                  Ja, ta bort
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-grey50 text-white px-4 py-2 rounded"
                >
                  Avbryt
                </button>
              </div>
            </div>
          </div>
        )}

        <div className=" col-span-1 hidden lg:block ">
          <h1>meddelanden</h1>
        </div>
      </div>
    </div>
  );
}
