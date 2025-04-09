import Header from "@/components/Header";

export default function Adoption() {
  return (
    <main className="w-full h-full ">
      <Header />
      <div className="flex flex-col justify-center text-center py-20 px-2 lg:p-36">
        <h1 className="text-4xl font-special font bold">
          Innehåll kommer snart!
        </h1>
        <div className="font font-poppins text-lg">
          <p>Här kommer du kunna läsa mer om djurorganizationer</p>
          <p>Eller ta kontakt med dom 🐾</p>
        </div>
      </div>
    </main>
  );
}
