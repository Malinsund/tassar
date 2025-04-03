"use client";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import ProfileImage from "@/components/ProfileImage";
import { db } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import { use, useEffect, useState } from "react";

export default function UserProfile({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const [username, setUsername] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [, setProfileImage] = useState<string | null>(null);
  const [userImages, setUserImages] = useState<string[]>([]);

  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState<
    { senderId: string; content: string }[]
  >([]);

  const auth = getAuth();
  const currentUser = auth.currentUser;
  const loggedInUserId = currentUser ? currentUser.uid : null; // Dynamiskt användar-ID

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log("Användarens ID:", userId);

      if (userId) {
        try {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUsername(data.username || "Okänd användare");
            setDescription(data.description || "");
            setProfileImage(data.profileImage || null);
          } else {
            console.log("Användaren finns inte.");
          }

          const postsQuery = query(
            collection(db, "posts"),
            where("userId", "==", userId)
          );
          const querySnapshot = await getDocs(postsQuery);
          const images: string[] = [];
          querySnapshot.forEach((doc) => {
            const postData = doc.data();
            if (postData.imageUrl) {
              images.push(postData.imageUrl);
            }
          });
          setUserImages(images);
        } catch (error) {
          console.error("Fel vid hämtning av användardata:", error);
        }
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleOpenMessage = async () => {
    setIsMessageOpen(true);

    if (!loggedInUserId) return;

    const conversationId =
      loggedInUserId < userId
        ? `${loggedInUserId}_${userId}`
        : `${userId}_${loggedInUserId}`;

    const messagesRef = collection(db, "messages", conversationId, "chats");
    const querySnapshot = await getDocs(messagesRef);

    const loadedMessages = querySnapshot.docs.map((doc) => ({
      senderId: doc.data().senderId,
      content: doc.data().content,
    }));

    setMessages(loadedMessages);
  };

  const handleSendMessage = async () => {
    if (!loggedInUserId || !messageContent.trim()) return;

    const conversationId =
      loggedInUserId < userId
        ? `${loggedInUserId}_${userId}`
        : `${userId}_${loggedInUserId}`;

    await addDoc(collection(db, "messages", conversationId, "chats"), {
      senderId: loggedInUserId,
      content: messageContent.trim(),
      timestamp: new Date(),
    });

    setMessages([
      ...messages,
      { senderId: loggedInUserId, content: messageContent.trim() },
    ]);
    setMessageContent("");
  };

  return (
    <div>
      <Header />
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div
        className={`grid grid-cols-1 lg:${
          isMessageOpen ? "grid-cols-6" : "grid-cols-4"
        } lg:h-screen gap-2 font-poppins transition-all duration-300`}
      >
        {/* Profilinformationen */}
        <div className="flex flex-col text-center items-center col-span-2 p-4 gap-2 lg:gap-6">
          <ProfileImage userId={userId} isEditing={false} size={240} />
          {username && <h2 className="text-2xl font-bold">@{username}</h2>}
          {description && <p className="text-lg">{description}</p>}
          <div>
            <button
              onClick={handleOpenMessage}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Skicka meddelande
            </button>
          </div>
        </div>

        {/* Inläggssektionen */}
        <div className="border-t-2 border-l-0 lg:border-t-0 lg:border-l-2 p-2 col-span-2">
          <h1 className="text-lg">{username}&apos;s Inlägg</h1>
          <div className="grid grid-cols-4 gap-2">
            {userImages.map((image, index) => (
              <div key={index} className="flex justify-center items-center">
                <Image
                  src={image}
                  alt={`User Image ${index}`}
                  className="w-32 h-32 object-cover rounded-lg m-2"
                  width={128}
                  height={128}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Meddelanderutan - visas endast om öppen */}
        {isMessageOpen && (
          <div className=" p-4 col-span-2 bg-white shadow-lg">
            <button onClick={() => setIsMessageOpen(false)} className="text-xl">
              ×
            </button>
            <h2 className="text-xl font-bold mb-2">
              Meddelande med @{username}
            </h2>
            <div className="overflow-y-auto h-80 border p-2 mb-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-md my-1 ${
                    msg.senderId === loggedInUserId
                      ? "bg-blue-300 text-right"
                      : "bg-gray-300 text-left"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
            <textarea
              className="w-full border p-2"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
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
      </div>
    </div>
  );
}
