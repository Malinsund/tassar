/* import { db } from "@/firebaseConfig";
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";


export const sendMessage = async (senderId: string, receiverId: string, text: string) => {
  try {
    
    const conversationId = [senderId, receiverId].sort().join("_");

    const conversationRef = doc(db, "conversations", conversationId);

    const conversationSnap = await getDoc(conversationRef);

    if (!conversationSnap.exists()) {
     
      await setDoc(conversationRef, {
        user1Id: senderId,
        user2Id: receiverId,
        lastMessage: text,
        lastTimestamp: serverTimestamp(),
      });
    } else {
    
      await setDoc(conversationRef, {
        lastMessage: text,
        lastTimestamp: serverTimestamp(),
      }, { merge: true });
    }


    const messagesRef = collection(db, "conversations", conversationId, "messages");
    await addDoc(messagesRef, {
      senderId,
      text,
      timestamp: serverTimestamp(),
    });

    console.log("Meddelande skickat!");
  } catch (error) {
    console.error("Fel vid skickning av meddelande:", error);
  }
}; */