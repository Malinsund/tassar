"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "active" : "";
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between mx-10 mb-4 font-special text-2xl color-primary ">
      <div className={`nav p-2 ${isActive("/posts")}`}>
        <Link href={"/posts"}>
          <h2>Flöde</h2>
        </Link>
      </div>
      <div className={`nav p-2 ${isActive("/forum")}`}>
        <Link href={"/forum"}>
          <h2>Forum</h2>
        </Link>
      </div>
      <div className={`nav p-2 ${isActive("/adoption")}`}>
        <Link href={"/adoption"}>
          <h2>Omplacering</h2>
        </Link>
      </div>
      <div className={`nav p-2 ${isActive("/lost-and-found")}`}>
        <Link href={"/lost-and-found"}>
          <h2>Efterlysning</h2>
        </Link>
      </div>
      <div className={`nav p-2 ${isActive("/organizations")}`}>
        <Link href={"/organizations"}>
          <h2>Organisationer</h2>
        </Link>
      </div>
      <div className={`nav p-2 ${isActive("/profile")}`}>
        <Link href={"/profile"}>
          <h2>Profil</h2>
        </Link>
      </div>
    </div>
  );
}
