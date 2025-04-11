"use client";
import Card from "@/components/Card";
import CreatePostModal from "@/components/CreatePostModal";
import Header from "@/components/Header";
import MessageModal from "@/components/MessageModal";
import Navbar from "@/components/Navbar";
import SearchAndFilter from "@/components/search-and-filter";
import useAdoptionPosts from "@/hooks/useAdoptionPosts";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Adoption() {
  const { posts, loading } = useAdoptionPosts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const handleMessageClick = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const openPostModal = () => {
    setIsPostModalOpen(true);
  };

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };

  return (
    <main className="w-full h-full">
      <Header />
      <div className="hidden lg:block sticky top-0 z-30">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4">
        <aside className="col-span-1 p-8">
          <SearchAndFilter />
        </aside>
        <div className="col-span-2 flex flex-col justify-center text-center px-2">
          <div className="flex justify-center mb-6 sticky top-16 z-30">
            <button
              onClick={openPostModal}
              className="flex justify-center border-secondary border-2 text-black bg-white w-full font-poppins text-lg p-2 text-center place-items-center rounded-lg"
            >
              <PlusIcon className="w-6 h-6" /> Nytt inlägg
            </button>
          </div>

          {loading ? (
            <p>Laddar inlägg...</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="flex justify-center w-full h-auto mb-4"
              >
                <Card
                  imageUrl={post.imageUrl}
                  title={post.title}
                  description={post.description}
                  userId={post.userId}
                  context="adoption"
                  onAction={handleMessageClick}
                />
              </div>
            ))
          )}
        </div>

        {isPostModalOpen && (
          <CreatePostModal context="adoption" closeModal={closePostModal} />
        )}
        <div className="col-span-1">
          {isModalOpen && (
            <MessageModal userId={selectedUserId!} closeModal={closeModal} />
          )}
        </div>
      </div>
    </main>
  );
}
