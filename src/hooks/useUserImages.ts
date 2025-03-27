import { db } from "@/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";

export function useUserImages(userId: string | undefined) {
  const [userImages, setUserImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      if (userId) {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const images: string[] = [];
        querySnapshot.forEach((doc) => {
          const post = doc.data();
          if (post.userId === userId && post.imageUrl) {
            images.push(post.imageUrl);
          }
        });
        setUserImages(images);
      }
    };

    fetchImages();
  }, [userId]);

  return { userImages, deleteUserImage: async (image: string) => {} };
}
