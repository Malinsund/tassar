"use client";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import ProfileImage from "@/components/ProfileImage";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { use, useEffect, useState } from "react";

export default function UserProfile({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const [username, setUsername] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userImages, setUserImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userId) {
        try {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUsername(data.username || "Okänd användare");
            setDescription(data.description || "");
            setProfileImage(data.profileImage || null);

            // setUserImages(data.images || []);
          } else {
            console.log("Användaren finns inte.");
          }
        } catch (error) {
          console.error("Fel vid hämtning av användardata:", error);
        }
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <div>
      <Header />
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        <div className="flex flex-col justify-center text-center items-center bg-slate-300 col-span-2 p-4 gap-2">
          <ProfileImage userId={userId} isEditing={false} size={120} />
          {username && <h2 className="text-2xl font-bold">@{username}</h2>}
          {description && <p className="text-lg">{description}</p>}
        </div>

        <div className="bg-blue-100 col-span-2">
          <h1>Bilder</h1>
          <div className="grid grid-cols-4 gap-2">
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
      </div>
    </div>
  );
}
