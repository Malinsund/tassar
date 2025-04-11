import { db } from "@/firebaseConfig";
import { Timestamp, query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

export type AdoptionPost = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    userId: string;
    createdAt: Timestamp; 
  };
  
  export default function useAdoptionPosts() {
    const [posts, setPosts] = useState<AdoptionPost[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const q = query(collection(db, "adoptionPosts"), orderBy("createdAt", "desc"));
  
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedPosts: AdoptionPost[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<AdoptionPost, "id">),
        }));
        setPosts(fetchedPosts);
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, []);
  
    return { posts, loading };
  }