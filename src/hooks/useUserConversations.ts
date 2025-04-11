import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebaseConfig";
import { collection, onSnapshot, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";

type Conversation = {
  id: string;
  participants: string[];
  messages: {
    senderId: string;
    text: string;
    timestamp: { seconds: number; nanoseconds: number };
  }[];
  lastUpdated: Timestamp;
};

export default function useUserConversations() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const convos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Conversation, "id">),
      }));
      setConversations(convos);
    });

    return () => unsubscribe();
  }, [user]);

  return { conversations };
}
