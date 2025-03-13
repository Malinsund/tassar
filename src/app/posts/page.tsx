"use client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import PostModal from "@/components/PostModal";
import { useProfile } from "@/context/ProfileContext";
import { mockPosts } from "@/data/mockPosts";
import { db } from "@/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  username: string;
  userProfileImage: string;
  imageUrl: string;
  postDescription: string;
  timestamp: string;
}

export default function PostPage() {
  const { imageUrl } = useProfile();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "posts"), orderBy("createdAt", "desc"))
      );
      const postsData = querySnapshot.docs.map((doc) => doc.data());

      const posts = postsData.map((post: any) => ({
        id: post.id,
        username: post.username,
        userProfileImage: post.userProfileImage,
        imageUrl: post.imageUrl,
        postDescription: post.description,
        timestamp: post.createdAt.toDate().toString(),
      }));

      setPosts(posts);
    };

    fetchPosts();
  }, []);

  const handlePostAdded = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div>
      <Header />
      <div className="hidden lg:block sticky top-0">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 text-center gap-2">
        <div className="lg:col-span-1 bg-purple-300">
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white p-2 rounded w-80"
            >
              Lägg upp nytt inlägg
            </button>

            <PostModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
        <div className="lg:col-span-2 bg-yellow-200 overflow-y-scroll h-screen">
          <h1>
            Flöde - Här skall inlägged vara som stora kort (skapa komponent för
            korten)
          </h1>

          {/* 
          {posts.map((post) => (
            
            */}
          {mockPosts.map((post) => (
            <PostCard
              key={post.id}
              username={post.username}
              userProfileImage={post.userProfileImage}
              imageUrl={post.imageUrl}
              postDescription={post.postDescription}
              timestamp={post.timestamp}
            />
          ))}
        </div>
        <div className="lg:col-span-1 bg-green-200 hidden lg:block">
          <p>här skriver man kommenter på inlägget på stor skärm</p>
        </div>
      </div>
    </div>
  );
}
