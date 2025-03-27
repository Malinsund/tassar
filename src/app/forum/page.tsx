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
      <div className="grid lg:grid-cols-6 gap-2 m-2">
        <div className="bg-blue-300 lg:col-span-2">
          <h1 className="text-3xl font-special">kategorier</h1>
        </div>
        <div className="bg-cyan-600 lg:col-span-2">
          <h1 className="text-3xl font-special"> topp-listor</h1>
        </div>
        <div className="bg-sky-600 lg:col-span-2">
          <h1 className="text-3xl font-special text-white">inläggen</h1>
        </div>
      </div>
    </div>
  );
}
