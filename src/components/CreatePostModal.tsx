import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

type CreatePostModalProps = {
  context: "adoption" | "lost";
  closeModal: () => void;
};

export default function CreatePostModal({
  context,
  closeModal,
}: CreatePostModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  const { user } = useAuth();
  const handleSubmit = async () => {
    if (!title || !description || !imageUrl) return;
    const userId = user?.uid;

    try {
      const postData = {
        title,
        description,
        imageUrl,
        city,
        category,
        userId,
        createdAt: serverTimestamp(),
      };

      let collectionName = "";
      if (context === "adoption") collectionName = "adoptionPosts";
      else if (context === "lost") collectionName = "lostPosts";

      await addDoc(collection(db, collectionName), postData);

      console.log("Inlägg skapat!");
      closeModal();
    } catch (error) {
      console.error("Fel vid skapande av inlägg:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:text-black p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          Skapa ett nytt{" "}
          {context === "adoption" ? "adoptionsinlägg" : "lost and found-inlägg"}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Bild-URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Bild"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Titel</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Titel på inlägget"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Beskrivning</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Beskriv ditt djur"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Stad</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Stad"
          />
        </div>
        <div className="w-full md:w-2/3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Välj kategori</option>
            <option value="dog">Hundar</option>
            <option value="cat">Katter</option>
            <option value="rodent">Gnagare</option>
            <option value="reptile">Reptiler</option>
            <option value="bird">Fåglar</option>
            <option value="other">Andra djur</option>
          </select>
        </div>

        <div className="mt-4 flex justify-between">
          <SecondaryButton
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded"
            text="Stäng"
          />
          <PrimaryButton
            onClick={handleSubmit}
            className="bg-primary text-white px-4 py-2 rounded"
            text="Skapa inlägg"
          />
        </div>
      </div>
    </div>
  );
}
