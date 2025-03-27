import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface Thread {
  id: string;
  title: string;
  content: string;
  category: string;
}

interface Reply {
  id: string;
  content: string;
  createdAt: Timestamp; // Här använder vi Timestamp istället för Date
}

interface Props {
  thread: Thread | null;
}

export default function ThreadView({ thread }: Props) {
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState<Reply[]>([]);

  useEffect(() => {
    const fetchReplies = async () => {
      if (!thread) return;

      const repliesQuery = query(
        collection(db, "forumReplies"),
        where("threadId", "==", thread.id)
      );
      const querySnapshot = await getDocs(repliesQuery);
      const fetchedReplies = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Reply[];

      setReplies(fetchedReplies);
    };

    fetchReplies();
  }, [thread]);

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;

    await addDoc(collection(db, "forumReplies"), {
      threadId: thread?.id,
      content: replyContent,
      createdAt: new Date(),
    });

    setReplyContent("");
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg border flex flex-col h-full">
      {thread ? (
        <>
          <h2 className="text-2xl font-bold mb-2">{thread.title}</h2>
          <p className="text-gray-700 mb-4">{thread.content}</p>
        </>
      ) : (
        <p className="p-4 text-gray-600">
          Välj en tråd för att visa innehållet
        </p>
      )}

      <div className="flex-grow overflow-y-auto mb-4">
        <h3 className="text-xl font-semibold mb-2">Svar:</h3>
        <ul className="space-y-2">
          {replies.map((reply) => (
            <li key={reply.id} className="p-2 bg-gray-100 rounded">
              <p>{reply.content}</p>
              <p className="text-sm text-gray-500">
                Postat: {reply.createdAt.toDate().toLocaleString()}{" "}
                {/* Här använder vi toDate() på Timestamp */}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 border-t pt-4">
        <h3 className="text-xl font-semibold mb-2">Skriv ett svar</h3>
        <textarea
          placeholder="Skriv ditt svar här..."
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          className="w-full border p-2 mb-2"
          rows={4}
        />
        <button
          onClick={handleReplySubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Skicka svar
        </button>
      </div>
    </div>
  );
}
