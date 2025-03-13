"use client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { useProfile } from "@/context/ProfileContext";
import { mockPosts } from "@/data/mockPosts";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
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

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
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
  return (
    <div>
      <Header />
      <div className="hidden lg:block sticky top-">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 text-center gap-2">
        <div className="lg:col-span-1 bg-purple-300">
          {" "}
          <p>heeej lägg upp ett nytt inlägg hääär</p>
          {/* lägg upp nytt inlägg */}
        </div>
        <div className="lg:col-span-2 bg-yellow-200 overflow-y-scroll h-screen">
          <h1>
            Flöde - Här skall inlägged vara som stora kort (skapa komponent för
            korten)
          </h1>
          {/* {posts.map((post) => ( */}
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
