"use client";
import CategoryList from "@/components/CategoryList";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import NewThreadModal from "@/components/NewThreadModal";
import ThreadList from "@/components/ThreadList";
import ThreadView from "@/components/ThreadView";
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
    <main className="max-h-screen">
      <Header />
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="grid lg:grid-cols-8 gap-2 m-2">
        <div className="flex justify-between p-4 lg:col-span-2">
          <div>
            <h1 className="font-special text-2xl m-6">Forumet</h1>
            <CategoryList
              onCategorySelect={(category) => {
                setSelectedCategory(category);
                setActiveThread(null);
              }}
            />
            <div className="p-2">
              <button
                aria-label="Lägg upp ny tråd i forumet"
                onClick={() => setIsModalOpen(true)}
                className="rounded-full p-2 w-12"
              >
                <PencilSquareIcon />
              </button>
            </div>
          </div>
        </div>
        <div className=" lg:col-span-2 p-4">
          {selectedCategory && (
            <ThreadList
              selectedCategory={selectedCategory}
              onThreadSelect={setActiveThread}
              activeThreadId={activeThread?.id || null}
            />
          )}
        </div>
        <div className="lg:col-span-4 overflow-y-auto p-4">
          {activeThread ? (
            <ThreadView thread={activeThread} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl font-poppins">
                Välj en tråd för att visa innehållet
              </p>
            </div>
          )}
        </div>
        <NewThreadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </main>
  );
}
