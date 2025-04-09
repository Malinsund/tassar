import { db } from "@/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Thread {
  id: string;
  title: string;
  content: string;
  category: string;
}

interface Props {
  selectedCategory: string;
  onThreadSelect: (thread: Thread) => void;
  activeThreadId: string | null;
}

export default function ThreadList({
  selectedCategory,
  onThreadSelect,
  activeThreadId,
}: Props) {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    console.log("Hämtar trådar för kategori:", selectedCategory);
    const fetchThreads = async () => {
      if (!selectedCategory) return;

      const q = query(
        collection(db, "forumThreads"),
        where("category", "==", selectedCategory)
      );
      const querySnapshot = await getDocs(q);
      const fetchedThreads = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Thread[];

      setThreads(fetchedThreads);
    };

    fetchThreads();
  }, [selectedCategory]);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-special font-bold mb-2">
        Trådar i &quot;{selectedCategory}&quot;
      </h2>
      <ul>
        {threads.map((thread) => (
          <li
            key={thread.id}
            onClick={() => onThreadSelect(thread)}
            className={`cursor-pointer p-2 font-poppins rounded ${
              activeThreadId === thread.id
                ? "  text-2xl font-semibold"
                : " text-lg font-semibold"
            }`}
          >
            &quot;{thread.title}&quot;
          </li>
        ))}
      </ul>
    </div>
  );
}
