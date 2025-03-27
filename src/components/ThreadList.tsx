import React from "react";

interface Thread {
  id: string;
  title: string;
}

const ThreadList: React.FC<{
  threads: Thread[];
  onSelect: (threadId: string) => void;
}> = ({ threads, onSelect }) => {
  return (
    <div className="bg-green-300 p-4">
      <h1 className="text-2xl font-bold">Trådar</h1>
      <ul>
        {threads.map((thread) => (
          <li
            key={thread.id}
            onClick={() => onSelect(thread.id)}
            className="cursor-pointer p-2 hover:bg-green-400"
          >
            {thread.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
