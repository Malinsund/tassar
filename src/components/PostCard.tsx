import { db } from "@/firebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import CommentBubble from "./buttons/CommentButton";
import CommentForm from "./CommentForm";
import ProfileImage from "./ProfileImage";

interface PostCardProps {
  id: string;
  username: string;
  userId: string;
  userProfileImage: string;
  imageUrl: string;
  postDescription: string;
  timestamp: string;
  postComments: string[];
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  username,
  userId,
  userProfileImage,
  imageUrl,
  postDescription,
  timestamp,
  postComments,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [comments, setComments] = useState<string[]>(postComments || []);
  const [isCommenting, setIsCommenting] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const formattedDate = new Date(timestamp).toLocaleString();

  const handleAddComment = async (newComment: string | undefined) => {
    if (!newComment || newComment.trim() === "") {
      console.error("Kommentar är tom!!");
      return;
    }

    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, {
      postComments: arrayUnion(newComment || ""),
    });

    setComments((prevComments) => [...prevComments, newComment]);
  };
  const toggleCommentsVisibility = () => {
    setIsCommenting((prev) => !prev);
  };

  return (
    <>
      <div className="bg-gray-100 rounded-lg shadow-md p-4 mb-4">
        {/* Profilsektion */}
        <div className="flex items-center gap-3">
          <div className="h-10 m-2">
            <ProfileImage userId={userId} isEditing={false} />
          </div>
          <div>
            <p className="font-semibold">{username}</p>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>

        {/* Inläggsbild */}
        <div className="mt-3 flex justify-center">
          <Image
            src={imageUrl}
            alt="Post image"
            width={500}
            height={500}
            className="rounded-lg object-cover w-96 h-96 "
          />
        </div>
        <div className="w-8 h-8"></div>

        {/* Beskrivning */}
        <p className="mt-2 text-gray-800">{postDescription}</p>
        <CommentBubble comments={comments} />

        {/* Formulär för att lägga till en kommentar */}
        {isCommenting && <CommentForm onAddComment={handleAddComment} />}

        {/* Knapp för att visa/öppna kommentarsfältet */}
        <button
          onClick={toggleCommentsVisibility}
          className="mt-4 text-blue-500 hover:text-blue-700"
        >
          {isCommenting ? "Dölj kommentarer" : "Lägg till en kommentar"}
        </button>
      </div>
    </>
  );
};

export default PostCard;
