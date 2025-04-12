import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

type MessageModalProps = {
  userId: string;
  closeModal: () => void;
};

export default function MessageModal({
  userId,
  closeModal,
}: MessageModalProps) {
  const [message, setMessage] = useState("");

  const { user } = useAuth();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const senderId = user?.uid;
    const receiverId = userId;

    if (!senderId) return;

    try {
      const conversationsRef = collection(db, "conversations");
      const q = query(
        conversationsRef,
        where("participants", "array-contains", senderId)
      );
      const querySnapshot = await getDocs(q);

      const sortedIds = [senderId, receiverId].sort();
      let conversationId = null;

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const existingIds = data.participants.slice().sort();
        if (
          existingIds[0] === sortedIds[0] &&
          existingIds[1] === sortedIds[1]
        ) {
          conversationId = docSnap.id;
        }
      });

      if (!conversationId) {
        const newConvRef = await addDoc(conversationsRef, {
          participants: sortedIds,
          lastUpdated: serverTimestamp(),
        });
        conversationId = newConvRef.id;
      }

      const messagesRef = collection(
        db,
        "conversations",
        conversationId,
        "messages"
      );
      await addDoc(messagesRef, {
        senderId,
        text: message,
        timestamp: serverTimestamp(),
      });

      console.log("Meddelande skickat till", receiverId);
      setMessage("");
      closeModal();
    } catch (error) {
      console.error("Fel vid meddelandesändning:", error);
    }
  };

  return (
    <div className=" sticky top-16 flex dark:text-black justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Skicka meddelande</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-32 p-2 border rounded-md"
          placeholder="Skriv ditt meddelande här"
        />
        <div className="mt-4 flex justify-between">
          <SecondaryButton
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded"
            text="stäng"
          />

          <PrimaryButton
            onClick={handleSendMessage}
            className=" px-4 py-2 rounded"
            text="skicka"
          />
        </div>
      </div>
    </div>
  );
}
