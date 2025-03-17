"use client";
import { useState } from "react";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostModal({ isOpen, onClose }: PostModalProps) {
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-grey10 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">nytt inlägg</h2>

        {/* Beskrivning */}
        <textarea
          placeholder="Skriv en beskrivning..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-4 p-2 border border-gray-300 rounded"
        />

        {/* Knappar */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white p-2 rounded"
          >
            Stäng
          </button>
          <button
            onClick={() => alert("Funktionaliteten är borttagen")}
            className="bg-grey10 text-white p-2 rounded"
          >
            Lägg upp
          </button>
        </div>
      </div>
    </div>
  );
}
