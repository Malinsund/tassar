"use client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { useProfile } from "@/context/ProfileContext";

export default function PostPage() {
  const { imageUrl } = useProfile();
  return (
    <div>
      <Header />
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 text-center gap-2">
        <div className="lg:col-span-1 bg-purple-300">
          {" "}
          <p>heeej lägg upp ett nytt inlägg hääär</p>
          {/* lägg upp nytt inlägg */}
        </div>
        <div className="lg:col-span-2 bg-yellow-200">
          <h1>
            Flöde - Här skall inlägged vara som stora kort (skapa komponent för
            korten)
          </h1>
        </div>
        <div className="lg:col-span-1 bg-green-200 hidden lg:block">
          <p>här skriver man kommenter på inlägget på stor skärm</p>
        </div>
      </div>
    </div>
  );
}
