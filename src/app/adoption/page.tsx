"use client";
import Card from "@/components/Card";
import CreatePostModal from "@/components/CreatePostModal";
import Header from "@/components/Header";
import MessageModal from "@/components/MessageModal";
import Navbar from "@/components/Navbar";
import SearchAndFilter from "@/components/search-and-filter";
import { useState } from "react";

export default function Adoption() {
  const pet = {
    imageUrl: "/hund.png",
    name: "Bosse",
    description: "En snäll liten vovve som söker ett nytt hem!",
    ownerId: "abc123",
  };

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
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4">
        <aside className="col-span-1 p-8">
          <SearchAndFilter />
        </aside>
        <div className="col-span-2 flex flex-col justify-center text-center px-2">
          <div className="flex justify-center mb-6">
            <button
              onClick={openPostModal}
              className="flex justify-center border-secondary border-2 text-black bg-white w-full font-poppins text-lg p-2 text-center place-items-center rounded-lg"
            >
              + nytt inlägg
            </button>
          </div>

          <div className="flex justify-center w-full h-auto">
            <Card
              imageUrl={pet.imageUrl}
              title={pet.name}
              description={pet.description}
              userId={pet.ownerId}
              context="adoption"
              onAction={handleMessageClick}
            />
          </div>
        </div>

        {isModalOpen && (
          <MessageModal userId={selectedUserId!} closeModal={closeModal} />
        )}

        {isPostModalOpen && (
          <CreatePostModal context="adoption" closeModal={closePostModal} />
        )}
        <div className="col-span-1"></div>
      </div>
    </main>
  );
}
