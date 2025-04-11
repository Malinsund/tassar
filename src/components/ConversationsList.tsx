import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebaseConfig";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

type Conversation = {
  id: string;
  participants: string[];
};

const ConversationsList = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;

      const q = query(
        collection(db, "conversations"),
        where("participants", "array-contains", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const convs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Conversation, "id">),
      }));

      setConversations(convs);

      const otherUserIds = convs.flatMap((conv) =>
        conv.participants.filter((id) => id !== user.uid)
      );

      const names: { [key: string]: string } = {};
      for (const userId of otherUserIds) {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          names[userId] = userSnap.data().username || "Okänt namn";
        }
      }
      setUserNames(names);
    };

    fetchConversations();
  }, [user]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeConversationId) return;

      const convRef = doc(db, "conversations", activeConversationId);
      const convSnap = await getDoc(convRef);
      if (convSnap.exists()) {
        setMessages(convSnap.data().messages || []);
      }
    };

    fetchMessages();
  }, [activeConversationId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeConversationId) return;

    const convRef = doc(db, "conversations", activeConversationId);

    await updateDoc(convRef, {
      messages: arrayUnion({
        senderId: user?.uid,
        text: newMessage,
        timestamp: new Date(),
      }),
    });

    await updateDoc(convRef, {
      lastUpdated: serverTimestamp(),
    });

    setNewMessage("");
  };

  if (!user) return <p>Logga in för att se dina konversationer.</p>;

  return (
    <div className="mt-8">
      <ul className="space-y-2">
        {conversations.map((conv) => {
          const otherUserId = conv.participants.find((id) => id !== user.uid);
          const otherUserName = otherUserId
            ? userNames[otherUserId]
            : "Okänt användarnamn";

          return (
            <li key={conv.id}>
              <button
                onClick={() =>
                  setActiveConversationId(
                    activeConversationId === conv.id ? null : conv.id
                  )
                }
                className="text-primary hover:underline"
              >
                Konversation med {otherUserName}
              </button>

              {/* Chat-rutan */}
              {activeConversationId === conv.id && (
                <div className="p-4 bg-white shadow-lg rounded-md mt-4">
                  <button
                    onClick={() => setActiveConversationId(null)}
                    className="text-xl absolute top-2 right-2"
                  >
                    ×
                  </button>
                  <h2 className="text-xl font-bold mb-2">
                    Meddelande med @{otherUserName}
                  </h2>
                  <div className="overflow-y-auto h-80 border p-2 mb-2">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded-md my-1 ${
                          msg.senderId === user?.uid
                            ? "bg-blue-300 text-right"
                            : "bg-gray-300 text-left"
                        }`}
                      >
                        {msg.text}
                        <span className="block text-xs text-gray-500">
                          {new Date(
                            msg.timestamp?.seconds * 1000
                          ).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <textarea
                    className="w-full border p-2"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Skriv ett meddelande..."
                  />
                  <button
                    onClick={handleSendMessage}
                    className="w-full bg-primary text-white py-2 mt-2"
                  >
                    Skicka
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ConversationsList;
