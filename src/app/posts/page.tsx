"use client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import PostModal from "@/components/PostModal";
import { db } from "@/firebaseConfig";
import { PlusIcon } from "@heroicons/react/24/outline";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  username: string;
  userId: string;
  userProfileImage: string;
  imageUrl: string;
  description: string;
  timestamp: string;
  postComments: { text: string; username: string }[];
}
interface Comment {
  text: string;
  username: string;
}

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "posts"), orderBy("createdAt", "desc"))
      );

      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        username: doc.data().username,
        userId: doc.data().userId,
        userProfileImage: doc.data().userProfileImage,
        imageUrl: doc.data().imageUrl,
        description: doc.data().description,
        timestamp:
          doc
            .data()
            .createdAt?.toDate()
            .toString() || "",
        postComments:
          doc.data().comments?.map((c: Comment) => ({
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
      <header>
        <Header />
      </header>
      <nav className="hidden lg:block sticky top-0">
        <Navbar />
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        <div className="lg:col-span-1">
          {" "}
          <h1 className="font-special text-2xl m-6">Välkommen till flödet</h1>
        </div>
        <div className="lg:col-span-2 border-2 rounded-lg border-secondary hidden lg:block sticky w-full top-16">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex justify-center text-black bg-white font-poppins text-lg p-2 text-center place-items-center w-full rounded-lg"
          >
            <PlusIcon className="w-8 h-8" /> <p>Nytt inlägg</p>
          </button>
        </div>
        <div className="lg:col-span-2 lg:col-start-2 overflow-y-scroll h-auto">
          <div className="">
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
              userId={post.userId}
              userProfileImage={post.userProfileImage}
              imageUrl={post.imageUrl}
              postDescription={post.description}
              timestamp={post.timestamp}
              postComments={post.postComments}
            />
          ))}
        </div>
        <div className="sticky bottom-0 z-30 flex justify-center lg:hidden">
          <button
            aria-label="lägg upp nytt inlägg i flödet"
            onClick={() => setIsModalOpen(true)}
            className="bg-whiteopac text-black dark:bg-blackopac dark:text-white p-2 text-center place-items-center  w-full"
          >
            <PlusIcon className="w-8 h-8" />
          </button>
        </div>
      </div>
    </>
  );
}
