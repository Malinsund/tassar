"use client";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function Forum() {
  return (
    <div>
      <Header />
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <h1>hej hej forumet!</h1>
    </div>
  );
}
