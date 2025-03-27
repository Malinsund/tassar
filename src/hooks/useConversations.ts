import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebaseConfig";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

interface User {
  username: string;
}

interface Message {
  senderId: string;
  content: string;
  timestamp: number;
}

interface Conversation {
  id: string;
  user1Id: string;
  user2Id: string;
  lastMessage: string;
  lastTimestamp: number;
  otherUsername: string;
  messages: Message[]; // Lägg till meddelanden här
}

export const useConversations = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    if (user?.uid) {
      const q1 = query(
        collection(db, "conversations"),
        where("user1Id", "==", user.uid)
      );
      const q2 = query(
        collection(db, "conversations"),
        where("user2Id", "==", user.uid)
      );

      const unsubscribe1 = onSnapshot(q1, async (querySnapshot1) => {
        const allConversations: Conversation[] = [];
        for (const docSnapshot of querySnapshot1.docs) {
          const data = docSnapshot.data();
          const otherUserId = data.user1Id === user.uid ? data.user2Id : data.user1Id;

          const userDoc = await getDoc(doc(db, "users", otherUserId));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;

            // Hämta meddelandena för den här konversationen
            const messagesRef = collection(db, "messages", docSnapshot.id, "chats");
            const messagesSnapshot = await getDocs(messagesRef);
            const messages = messagesSnapshot.docs.map((doc) => doc.data() as Message);

            allConversations.push({
              id: docSnapshot.id,
              user1Id: data.user1Id,
              user2Id: data.user2Id,
              lastMessage: data.lastMessage,
              lastTimestamp: data.lastTimestamp,
              otherUsername: userData.username || "Okänd",
              messages: messages, // Lägg till meddelandena här
            });
          }
        }
        setConversations(allConversations);
      });

      const unsubscribe2 = onSnapshot(q2, async (querySnapshot2) => {
        const allConversations: Conversation[] = [];
        for (const docSnapshot of querySnapshot2.docs) {
          const data = docSnapshot.data();
          const otherUserId = data.user1Id === user.uid ? data.user2Id : data.user1Id;

          const userDoc = await getDoc(doc(db, "users", otherUserId));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;

            // Hämta meddelandena för den här konversationen
            const messagesRef = collection(db, "messages", docSnapshot.id, "chats");
            const messagesSnapshot = await getDocs(messagesRef);
            const messages = messagesSnapshot.docs.map((doc) => doc.data() as Message);

            allConversations.push({
              id: docSnapshot.id,
              user1Id: data.user1Id,
              user2Id: data.user2Id,
              lastMessage: data.lastMessage,
              lastTimestamp: data.lastTimestamp,
              otherUsername: userData.username || "Okänd",
              messages: messages, // Lägg till meddelandena här
            });
          }
        }
        setConversations(allConversations);
      });

      // Clean up subscriptions when component unmounts
      return () => {
        unsubscribe1();
        unsubscribe2();
      };
    }
  }, [user]);

  return conversations;
};
