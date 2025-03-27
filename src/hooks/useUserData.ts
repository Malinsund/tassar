import { db } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useUserData(userId: string | undefined) {
  const [username, setUsername] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUsername(userData.username);
          setDescription(userData.description || null);
        }
      };

      fetchData();
    }
  }, [userId]);

  const updateDescription = async (newDescription: string) => {
    if (userId) {
      const docRef = doc(db, "users", userId);
      await setDoc(docRef, { description: newDescription }, { merge: true });
      setDescription(newDescription);
    }
  };

  return { username, description, setDescription: updateDescription };
}
