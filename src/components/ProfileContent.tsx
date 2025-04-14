"use client";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/PrimaryButton";
import ProfileImage from "@/components/ProfileImage";
import { useAuth } from "@/context/AuthContext";
import { useUserData } from "@/hooks/useUserData";
import { useUserImages } from "@/hooks/useUserImages";
import { XCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import router from "next/router";
import { useEffect, useState } from "react";
import ConversationsList from "./ConversationsList";
import MessageModal from "./MessageModal";

export default function ProfilePage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const queryUserId = searchParams?.get("userId");
  const userIdToShow = queryUserId || user?.uid || "";

  const { username, description, setDescription } = useUserData(userIdToShow);
  const { userImages, deleteUserImage } = useUserImages(userIdToShow);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newDescription, setNewDescription] = useState(description || "");
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const [showMessageModal, setShowMessageModal] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openMessageModal = (userIdToShow: string) => {
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  useEffect(() => {
    setIsOwnProfile(userIdToShow === user?.uid);
    console.log("Visar profil för:", userIdToShow);
  }, [userIdToShow, user]);

  useEffect(() => {
    setNewDescription(description || "");
  }, [description]);

  if (!user) {
    return (
      <div className="flex flex-col justify-center align-middle items-center">
        <Image
          src="/tassar.svg"
          alt="logga för hemsidan föreställande en tass med texten tassar"
          width={200}
          height={200}
        />
        <p className="text-center m-4 text-xl font-special">
          Logga in för att se din profil
        </p>
        <button
          onClick={() => router.push("/")}
          className="rounded bg-primary p-2 text-white shadow-sm w-32 font-special text-xl"
        >
          Logga in
        </button>
      </div>
    );
  }

  const handleDeleteImage = async () => {
    if (selectedImage) {
      await deleteUserImage(selectedImage);
      setShowConfirm(false);
    }
  };

  const saveAllChanges = async () => {
    if (isEditing && isOwnProfile) {
      await setDescription(newDescription);
    }
  };

  return (
    <main>
      <Header />
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:h-screen gap-2">
        {/* Profilinformation */}
        <div className="flex flex-col items-center col-span-1 p-4 gap-2 lg:gap-4">
          <h1 className="hidden">{username} profil</h1>
          <div className=" rounded-full ">
            <ProfileImage
              userId={userIdToShow!}
              isEditing={isEditing && isOwnProfile}
              size={200}
            />
          </div>
          {username && (
            <h1 className="text-2xl font-bold self-start lg:self-center text-left lg:text-center">
              @{username}
            </h1>
          )}
          <div className="text-left lg:text-center">
            {isEditing && isOwnProfile ? (
              <textarea
                className="rounded-lg dark:text-black border-grey10 w-56 h-24 lg:w-72 p-2"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            ) : (
              <p>{description || "Ingen beskrivning satt"}</p>
            )}
          </div>
          {isOwnProfile && (
            <div className="flex lg:mt-8 gap-8">
              <PrimaryButton
                onClick={() => {
                  if (isEditing) saveAllChanges();
                  setIsEditing(!isEditing);
                }}
                text={isEditing ? "Spara" : "Redigera profil"}
                className="lg:place-content-end "
              />
            </div>
          )}
        </div>

        {/* Bilder */}
        <div className="border-y-2 lg:border-y-0 lg:border-x-2 p-2 col-span-2 lg:flex-grow h-full">
          <div className="grid grid-cols-4 gap-2">
            {userImages.map((image, index) => (
              <div key={index} className="relative m-2">
                {isEditing && isOwnProfile && (
                  <button
                    aria-label="Radera inläggsbild"
                    className="absolute -top-2 -right-2"
                    onClick={() => {
                      setSelectedImage(image);
                      setShowConfirm(true);
                    }}
                  >
                    <XCircleIcon className="w-8 h-8 rounded-full fill-white" />
                  </button>
                )}
                <Image
                  src={image}
                  alt={`använarens profilbild ${index}`}
                  className="w-32 h-32 object-cover rounded-lg"
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Meddelanden */}
        {isOwnProfile && (
          <div className="col-span-1 lg:col-span-1 lg:block p-4">
            <h2 className="text-xl font-bold">Meddelanden</h2>
            <ConversationsList />
          </div>
        )}
        {!isOwnProfile && (
          <div className="flex justify-center  mt-4">
            <PrimaryButton
              onClick={() => openMessageModal(userIdToShow)}
              text="Skicka meddelande"
              className="w-2/3 h-10 z-10"
            />
            <div className="absolute flex justify-center items-center z-20">
              {showMessageModal && (
                <MessageModal
                  userId={userIdToShow!}
                  closeModal={closeMessageModal}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bekräftelse för att ta bort bild */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg text-center">
            <p className="text-xl font-special">
              Är du säker på att du vill ta bort denna bild?
            </p>
            <p className="font-poppins">Denna åtgärd går inte att ångra</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleDeleteImage}
                className="bg-destructive text-white font-special px-4 py-2 rounded"
              >
                Ja, ta bort
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-grey50 text-white px-4 py-2 rounded"
              >
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
