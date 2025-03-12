"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import ProfileImageView from "./ProfileImageView";
import { useProfile } from "@/context/ProfileContext";

export default function Header() {
  const { imageUrl } = useProfile();
  return (
    <div className="flex justify-between w-screen">
      <div>
        <Bars3Icon className="w-18 bg-pink-500 cursor-pointer" />
      </div>
      <div>
        <h1 className="font-special text-6xl m-20">Tassar</h1>
      </div>
      <div className="rounded-full w-10 h-10">
        <ProfileImageView imageUrl={imageUrl} />
      </div>
    </div>
  );
}
