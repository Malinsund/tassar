"use client";
import Image from "next/image";

interface PostCardProps {
  username: string;
  userProfileImage: string;
  imageUrl: string;
  postDescription: string;
  timestamp: string;
}

export default function PostCard({
  username,
  userProfileImage,
  imageUrl,
  postDescription,
  timestamp,
}: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      {/* Profilsektion */}
      <div className="flex items-center gap-3">
        <Image
          src={userProfileImage}
          alt={`${username}s profilbild`}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="font-semibold">{username}</p>
          <p className="text-sm text-gray-500">
            {new Date(timestamp).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Inläggsbild */}
      <div className="mt-3 ">
        <Image
          src={imageUrl}
          alt="Post image"
          width={500}
          height={500}
          className="rounded-lg object-cover w-96 h-96 "
        />
      </div>

      {/* Beskrivning */}
      <p className="mt-2 text-gray-800">{postDescription}</p>
    </div>
  );
}
