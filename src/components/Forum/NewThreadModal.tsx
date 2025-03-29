import { db } from "@/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  "Katter",
  "Hundar",
  "Kaniner",
  "Marsvin",
  "Hamster",
  "Råttor",
  "Möss",
  "Övriga gnagare",
  "Fåglar",
  "Ormar",
  "Ödlor",
  "Spindlar",
  "Fiskar",
];

export default function NewThreadModal({ isOpen, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSave = async () => {
    console.log("Sparar tråd i kategori:", selectedCategory);
    if (!title.trim() || !content.trim() || !selectedCategory) return;

    await addDoc(collection(db, "forumThreads"), {
      title,
      content,
      category: selectedCategory,
      createdAt: new Date(),
    });

    setTitle("");
    setContent("");
    setSelectedCategory("");

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Skapa ny tråd</h2>
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 mb-2"
        />
        <textarea
          placeholder="Skriv ditt inlägg..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 mb-2"
          rows={4}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border p-2 mb-4"
        >
          <option value="">Välj kategori...</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-2">
          <SecondaryButton
            onClick={onClose}
            className="px-4 py-2
           rounded"
            text="Avbryt"
          />

          <PrimaryButton
            onClick={handleSave}
            className="px-4 py-2 text-white rounded"
            text="Spara"
          />
        </div>
      </div>
    </div>
  );
}
