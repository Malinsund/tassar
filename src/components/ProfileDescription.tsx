import { db } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function ProfileDescription({
  userId,
  description,
  setDescription,
  username,
  isEditing,
  saveAllChanges,
}: {
  userId: string;
  description: string | null;
  setDescription: React.Dispatch<React.SetStateAction<string | null>>;
  username: string | null;
  isEditing: boolean;
  saveAllChanges: () => void;
}) {
  const [newDescription, setNewDescription] = useState(description || "");

  const saveDescription = async () => {
    await setDoc(
      doc(db, "users", userId),
      { description: newDescription },
      { merge: true }
    );
    setDescription(newDescription);
  };
  if (isEditing) {
    saveAllChanges();
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <textarea
            className="rounded-lg border-grey10 w-56 h-24"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>
      ) : (
        <p>{description || "Ingen beskrivning satt"}</p>
      )}
    </div>
  );
}
