"use client";
import CategoryList from "@/components/Forum/CategoryList";
import NewThreadModal from "@/components/Forum/NewThreadModal";
import ThreadList from "@/components/Forum/ThreadList";
import ThreadView from "@/components/Forum/ThreadView";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
interface Thread {
  id: string;
  title: string;
  content: string;
  category: string;
}

export default function Forum() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeThread, setActiveThread] = useState<Thread | null>(null);

  return (
    <div className="max-h-screen">
      <Header />
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="grid lg:grid-cols-8 gap-2 m-2">
        <div className="flex justify-between p-4 bg-blue-300 lg:col-span-2">
          <CategoryList
            onCategorySelect={(category) => {
              setSelectedCategory(category);
              setActiveThread(null);
            }}
          />
          <div className="p-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full p-2 w-12"
            >
              <PencilSquareIcon />
            </button>
          </div>
        </div>
        <div className="bg-cyan-600 lg:col-span-2">
          {selectedCategory && (
            <ThreadList
              selectedCategory={selectedCategory}
              onThreadSelect={setActiveThread}
              activeThreadId={activeThread?.id || null}
            />
          )}
        </div>
        <div className="bg-sky-600 lg:col-span-4 overflow-y-auto">
          {activeThread ? (
            <ThreadView thread={activeThread} />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              <p>Välj en tråd för att visa innehållet</p>
            </div>
          )}
        </div>
        <NewThreadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
