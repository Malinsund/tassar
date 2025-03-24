"use client";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import ProfileImage from "@/components/ProfileImage";
import { db } from "@/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
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
      console.log("Användarens ID:", userId);

      if (userId) {
        try {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUsername(data.username || "Okänd användare");
            setDescription(data.description || "");
            setProfileImage(data.profileImage || null);
          } else {
            console.log("Användaren finns inte.");
          }

          const postsQuery = query(
            collection(db, "posts"),
            where("userId", "==", userId)
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
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:h-screen gap-2 font-poppins">
        <div className="flex flex-col text-center items-center col-span-2 p-4 gap-2 lg:gap-6">
          <ProfileImage userId={userId} isEditing={false} size={240} />
          {username && <h2 className="text-2xl font-bold">@{username}</h2>}
          {description && <p className="text-lg">{description}</p>}
        </div>

        <div className="border-t-2 border-l-0 lg:border-t-0 lg:border-l-2 p-2 col-span-2">
          <h1 className="text-lg">{username}'s Inlägg</h1>
          <div className="grid grid-cols-4 gap-2">
            {userImages.map((image, index) => (
              <div key={index} className="flex justify-center items-center">
                <img
                  src={image}
                  alt={`User Image ${index}`}
                  className="w-32 h-32 object-cover rounded-lg m-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
