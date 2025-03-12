"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between m-6 font-special text-2xl">
      <div>
        <h2>Flöde</h2>
      </div>
      <div>
        <Link href={"/forum"}>
          <h2>Forum</h2>
        </Link>
      </div>
      <div>
        <h2>Omplacering</h2>
      </div>
      <div>
        <h2>Efterlysning</h2>
      </div>
      <div>
        <h2>Organisationer</h2>
      </div>
      <div>
        <Link href={"/profile"}>
          <h2>Profil</h2>
        </Link>
      </div>
    </div>
  );
}
