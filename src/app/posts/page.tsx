"use client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { useProfile } from "@/context/ProfileContext";

export default function PostPage() {
  const { imageUrl } = useProfile();
  return (
    <div>
      <Header imageUrl={imageUrl} />
      <Navbar />
    </div>
  );
}
