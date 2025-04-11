import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type CardProps = {
  imageUrl: string;
  title: string;
  description: string;
  userId: string;
  context: "lost" | "adoption";
  onAction?: (userId: string) => void;
};

export default function Card({
  imageUrl,
  title,
  description,
  userId,

  onAction,
}: CardProps) {
  return (
    <div className="relative bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-4 w-full h-auto">
      <Image
        src={imageUrl}
        alt={title}
        className="w-full max-h-[500px] object-contain rounded"
        width={400}
        height={400}
      />
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mt-2">{title}</h2>
        {/* Meddelandeikon */}
        <button
          onClick={() => onAction?.(userId)}
          className="text-gray-600 align-middle dark:text-white hover:text-primary"
          title="Skicka meddelande"
        >
          <EnvelopeIcon className="w-6 h-6" />
        </button>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mt-1">{description}</p>
    </div>
  );
}
