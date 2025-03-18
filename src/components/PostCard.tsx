import Image from "next/image";
import { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";

interface PostCardProps {
  id: string;
  username: string;
  userId: string;
  userProfileImage: string;
  imageUrl: string;
  postDescription: string;
  timestamp: string;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  username,
  userId,
  userProfileImage,
  imageUrl,
  postDescription,
  timestamp,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const formattedDate = new Date(timestamp).toLocaleString();

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        {/* Profilsektion */}
        <div className="flex items-center gap-3">
          {/* <Image
            src={userProfileImage || "/noImage.svg"}
            alt={`${username}s profilbild`}
            width={40}
            height={40}
            className="rounded-full"
          /> */}
          <ProfileImage userId={userId} isEditing={false} />
          <div>
            <p className="font-semibold">{username}</p>
            <p className="text-sm text-gray-500">{formattedDate}</p>
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
    </>
  );
};

export default PostCard;
