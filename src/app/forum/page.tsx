"use client";
import CategoryList from "@/components/CategoryList";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import NewThreadModal from "@/components/newThreadModal";
import ThreadList from "@/components/ThreadList";
import ThreadView from "@/components/ThreadView";
import { useState } from "react";

export default function Forum() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeThread, setActiveThread] = useState<any>(null);

  return (
    <div className="max-h-screen">
      <Header />
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="grid lg:grid-cols-6 gap-2 m-2">
        <div className="bg-blue-300 lg:col-span-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full p-2 w-10 h-10 m-4 border-2"
          >
            +
          </button>
          <input type="search" />
          <CategoryList
            onCategorySelect={(category) => {
              setSelectedCategory(category);
              setActiveThread(null);
            }}
          />
        </div>
        <div className="bg-cyan-600 lg:col-span-2">
          <h1 className="text-3xl font-special">Trådar</h1>
          {selectedCategory && (
            <ThreadList
              selectedCategory={selectedCategory}
              onThreadSelect={setActiveThread}
              activeThreadId={activeThread?.id || null}
            />
          )}
        </div>
        <div className="bg-sky-600 lg:col-span-2 overflow-y-auto">
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
