import { useState } from "react";

type MessageModalProps = {
  userId: string;
  closeModal: () => void;
};

export default function MessageModal({
  userId,
  closeModal,
}: MessageModalProps) {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    console.log("Skickar meddelande till", userId);
    console.log("Meddelande:", message);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Skicka meddelande</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-32 p-2 border rounded-md"
          placeholder="Skriv ditt meddelande här"
        />
        <div className="mt-4 flex justify-between">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Stäng
          </button>
          <button
            onClick={handleSendMessage}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Skicka
          </button>
        </div>
      </div>
    </div>
  );
}
