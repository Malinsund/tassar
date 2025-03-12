"use client";

import { db } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

interface ProfileContextType {
  imageUrl: string | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (user?.uid) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setImageUrl(userDoc.data().profileImage || null);
        }
      }
    };

    fetchProfileImage();
  }, [user]);

  useEffect(() => {
    const updateProfileImage = async () => {
      if (user?.uid && imageUrl) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().profileImage === imageUrl) {
          return;
        }
        await setDoc(
          doc(db, "users", user.uid),
          { profileImage: imageUrl },
          { merge: true }
        );
      }
    };

    updateProfileImage();
  }, [imageUrl, user]);

  return (
    <ProfileContext.Provider value={{ imageUrl, setImageUrl }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
