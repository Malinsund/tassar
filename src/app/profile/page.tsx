"use client";

import ProfileContent from "@/components/ProfileContent";
import { useAuth } from "@/context/AuthContext";
import { Suspense } from "react";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div>
        <p>Logga in för att se din profil.</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Laddar profil...</div>}>
      <ProfileContent />
    </Suspense>
  );
}
