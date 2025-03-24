"use client";
import { db } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

interface ProfileContextType {
  imageUrl: string | null;
  setImageUrl: (url: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user?.uid) {
      const fetchProfileImage = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setImageUrl(userDoc.data().profileImage || null);
        }
      };
      fetchProfileImage();
    }
  }, [user]);

  useEffect(() => {
    if (user?.uid && imageUrl) {
      setDoc(
        doc(db, "users", user.uid),
        { profileImage: imageUrl },
        { merge: true }
      );
    }
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
