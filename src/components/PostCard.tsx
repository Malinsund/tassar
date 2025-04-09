import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebaseConfig";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CommentBubble from "./CommentButton";
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
  postComments: { text: string; username: string }[];
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  username,
  userId,

  imageUrl,
  postDescription,
  timestamp,
  postComments,
}) => {
  const [comments, setComments] = useState(postComments || []);
  const [isCommenting, setIsCommenting] = useState(false);
  const { user } = useAuth();

  const formattedDate = new Date(timestamp).toLocaleString();

  useEffect(() => {
    const fetchPostComments = async () => {
      const postRef = doc(db, "posts", id);
      const postDoc = await getDoc(postRef);

      if (postDoc.exists()) {
        const updatedPost = postDoc.data();
        setComments(updatedPost?.postComments || []);
      }
    };

    fetchPostComments();
  }, [id]);

  const handleAddComment = async (
    newComment: string | undefined,
    username: string
  ) => {
    if (!newComment || newComment.trim() === "") {
      console.error("Kommentar är tom!!");
      return;
    }

    const commentData = {
      text: newComment,
      username: username,
      userId: user?.uid,
    };

    const postRef = doc(db, "posts", id);

    try {
      await updateDoc(postRef, {
        postComments: arrayUnion(commentData),
      });

      setComments((prevComments) => [...prevComments, commentData]);
    } catch (error) {
      console.error("Fel vid uppdatering av Firestore:", error);
    }
  };

  const toggleCommentsVisibility = () => {
    setIsCommenting((prev) => !prev);
  };

  return (
    <>
      <div className="bg-gray-100 rounded-lg shadow-md p-4 mb-4 font-poppins">
        {/* Profilsektion */}
        <div className="flex items-center gap-3">
          <div className="h-10 m-2">
            <ProfileImage userId={userId} isEditing={false} />
          </div>
          <div>
            <Link
              href={`/profile?userId=${userId}`}
              className="font-semibold text-black hover:underline"
            >
              <p className="font-semibold">@{username}</p>
            </Link>
            <p className="text-sm text-gray-700">{formattedDate}</p>
          </div>
        </div>

        {/* Inläggsbild */}
        <div className="mt-3 flex justify-center">
          <Image
            src={imageUrl}
            alt="uploaded image"
            width={500}
            height={500}
            className="rounded-lg object-cover w-full max-h-[800px]"
          />
        </div>
        <div className="w-8 h-8"></div>

        {/* Beskrivning */}
        <p className="mt-2 text-gray-800">{postDescription}</p>
        <CommentBubble comments={comments} />

        {/* Formulär för att lägga till en kommentar */}

        {isCommenting && (
          <CommentForm onAddComment={handleAddComment} username={username} />
        )}

        {/* Knapp för att visa/öppna kommentarsfältet */}
        <button
          onClick={toggleCommentsVisibility}
          className="mt-4 text-primary hover:text-black"
        >
          {isCommenting ? "Dölj kommentarer" : "Lägg till en kommentar"}
        </button>
      </div>
    </>
  );
};

export default PostCard;
