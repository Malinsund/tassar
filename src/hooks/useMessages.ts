import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";

type Message = {
  senderId: string;
  text: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
};

export const useMessages = (conversationId: string | null) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!conversationId) return;

    setLoading(true);
    const q = query(
      collection(db, "conversations", conversationId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => doc.data() as Message);
        setMessages(newMessages);
        setLoading(false);
      },
      
    );

    return () => unsubscribe();
  }, [conversationId]);

  const sendMessage = async (text: string) => {
    if (!user || !conversationId || !text.trim()) return;

    const messageData: Message = {
      senderId: user.uid,
      text: text.trim(),
      timestamp: serverTimestamp() as Timestamp,
    };

    try {
      await addDoc(
        collection(db, "conversations", conversationId, "messages"),
        messageData
      );
    } catch (err) {
      console.error("Fel vid skickande av meddelande:", err);
      setError("Kunde inte skicka meddelande.");
    }
  };

  return { messages, sendMessage, loading, error };
};
