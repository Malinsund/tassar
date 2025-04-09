import Header from "@/components/Header";

export default function Adoption() {
  return (
    <main className="w-full h-full ">
      <Header />
      <div className="flex flex-col justify-center text-center py-20 lg:p-36">
        <h1 className="text-4xl font-special font bold">
          Innehåll kommer snart!
        </h1>
        <div className="font font-poppins text-lg">
          <p>Så att du kan hitta nya hem till ditt/dina djur.</p>
          <p>Eller adoptera en ny familjemedlem 🐾</p>
        </div>
      </div>
    </main>
  );
}
