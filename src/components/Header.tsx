"use client";
import LogoutButton from "@/components/LogoutButton";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "./Navbar";
import ProfileImageView from "./ProfileImageView";

export default function Header() {
  const { imageUrl } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="flex justify-between lg:w-screen p-4 lg:p-8">
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="text-black"
          aria-label="öppna menyn"
        >
          <Bars3Icon className="w-8 h-8 cursor-pointer dark:text-white" />
        </button>
      </div>

      <div className="flex justify-center flex-grow w-32 h-28 lg:w-60 lg:h-44">
        <Image
          src="/logo.svg"
          alt="webbsidans logga, tassar"
          width={200}
          height={200}
        />
      </div>

      <div
        className="rounded-full w-10 h-10 cursor-pointer"
        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
      >
        <ProfileImageView imageUrl={imageUrl} />
      </div>

      {/* Hamburgermeny med slide-in effekt */}
      <nav
        className={`fixed top-0 left-0 h-screen w-3/4 z-50 bg-primary text-white shadow-lg lg:hidden transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Stängningsknapp för hamburgermeny */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white"
            aria-label="stäng menyn"
          >
            <XMarkIcon className="w-8 h-8 cursor-pointer" />
          </button>
        </div>

        {/* Själva menyn */}
        <Navbar />
      </nav>

      {/* Profilmeny */}
      <div
        className={` fixed top-0 right-0 h-auto w-64 lg:w-80 bg-primary rounded-l-md shadow-lg  transform transition-transform duration-300 z-50 ${
          profileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Stängningsknapp*/}
        <div className=" flex justify-between p-4 border-b-2">
          <button
            aria-label="Stäng menyn"
            onClick={() => setProfileMenuOpen(false)}
            className="text-white"
          >
            <XMarkIcon className="w-8 h-8 cursor-pointer" />
          </button>

          <div className="flex">
            <div className="rounded-full w-10 border-2">
              <ProfileImageView imageUrl={imageUrl} />
            </div>
            <Link href={"/profile"}>
              <p className="flex items-center text-lg text-white font-poppins px-2">
                {" "}
                {user?.username}
              </p>
            </Link>
          </div>
        </div>

        <div className="p-4 text-white">
          <div className="mt-10 text-xl font-bold">
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}
