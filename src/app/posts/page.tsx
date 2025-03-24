"use client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import PostModal from "@/components/PostModal";
import { useProfile } from "@/context/ProfileContext";
import { db } from "@/firebaseConfig";
import { PlusIcon } from "@heroicons/react/24/outline";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  username: string;
  userProfileImage: string;
  imageUrl: string;
  description: string;
  timestamp: string;
  postComments: { text: string; username: string }[];
}

export default function PostPage() {
  const { imageUrl: userProfileImage } = useProfile();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "posts"), orderBy("createdAt", "desc"))
      );
      const postsData = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        username: doc.data().username,
        userProfileImage: doc.data().userProfileImage,
        imageUrl: doc.data().imageUrl,
        description: doc.data().description,
        timestamp:
          doc
            .data()
            .createdAt?.toDate()
            .toString() || "",
        postComments:
          doc.data().comments?.map((c: any) => ({
            text: c.text || "",
            username: c.username || "Okänd användare",
          })) || [],
      }));

      setPosts(posts);
    };

    fetchPosts();
  }, []);

  const handlePostAdded = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <>
      <Header />
      <div className="hidden lg:block sticky top-0">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        <div className="lg:col-span-1"></div>
        <div className="lg:col-span-2 overflow-y-scroll h-screen">
          <div className="sticky top-0 flex justify-center z-30">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-greyopac text-black p-2 text-center place-items-center rounded w-full lg:w-2/3"
            >
              <PlusIcon className="w-8 h-8" />
            </button>

            <PostModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onPostAdded={handlePostAdded}
            />
          </div>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              username={post.username}
              userId={post.id}
              userProfileImage={post.userProfileImage}
              imageUrl={post.imageUrl}
              postDescription={post.description}
              timestamp={post.timestamp}
              postComments={post.postComments}
            />
          ))}
        </div>
        <div className="lg:col-span-1 hidden lg:block"></div>
      </div>
    </>
  );
}
