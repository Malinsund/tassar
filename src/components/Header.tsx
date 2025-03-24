"use client";
import { useProfile } from "@/context/ProfileContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Navbar from "./Navbar";
import ProfileImageView from "./ProfileImageView";
import LogoutButton from "./buttons/LogoutButton";

export default function Header() {
  const { imageUrl } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <div className="flex justify-between lg:w-screen p-4 lg:p-8">
      <div className="hidden lg:block w-36 h-36 -z-10">
        <img src="/Pawprints.jpg" alt="love" />
      </div>
      <div className="lg:hidden">
        <button onClick={() => setIsOpen(true)} className="text-black">
          <Bars3Icon className="w-8 h-8 cursor-pointer" />
        </button>
      </div>

      <div className="">
        <h1 className="font-special text-6xl m-4 lg:m-20 z-20">Tassar</h1>
      </div>

      <div
        className="rounded-full w-10 h-10 cursor-pointer"
        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
      >
        <ProfileImageView imageUrl={imageUrl} />
      </div>

      {/* Hamburgermeny med slide-in effekt */}
      <div
        className={`fixed top-0 left-0 h-screen w-3/4 z-50 bg-white shadow-lg lg:hidden transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Stängningsknapp för hamburgermeny */}
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} className="text-gray-600">
            <XMarkIcon className="w-8 h-8 cursor-pointer" />
          </button>
        </div>

        {/* Själva menyn */}
        <Navbar />
      </div>

      {/* Profilmeny */}
      <div
        className={`fixed top-0 right-0 h-auto w-auto bg-secondary rounded-l-md shadow-lg  transform transition-transform duration-300 ${
          profileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Stängningsknapp???*/}
        <div className=" p-4">
          <button
            onClick={() => setProfileMenuOpen(false)}
            className="text-primary"
          >
            <XMarkIcon className="w-8 h-8 cursor-pointer" />
          </button>
        </div>

        <div className="p-4 text-white">
          <h2>En rappikalja som tittar</h2>
          <div className="hidden lg:block">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
