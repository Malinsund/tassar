"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <div className="flex justify-between w-screen">
      <div>
        <Bars3Icon className="w-18 bg-pink-500 cursor-pointer" />
      </div>
      <div>
        <h1 className="font-special text-6xl m-20">Tassar</h1>
      </div>
      <div className="rounded-full border-2 border-black w-10 h-10"></div>
    </div>
  );
}
