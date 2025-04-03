import { db } from "@/firebaseConfig";
import { arrayRemove, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

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


  const deleteUserImage = async (image: string) => {
    if (!userId) return;

    const querySnapshot = await getDocs(collection(db, "posts"));

   
    querySnapshot.forEach(async (docSnapshot) => {
      const post = docSnapshot.data();
      const postId = docSnapshot.id;

      if (post.userId === userId && post.imageUrl === image) {
        
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, {
          imageUrl: arrayRemove(image), 
        });
      }
    });

   
    setUserImages((prevImages) => prevImages.filter((img) => img !== image));
  };

  return { userImages, deleteUserImage };
}
