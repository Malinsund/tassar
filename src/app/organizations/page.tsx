import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function Adoption() {
  return (
    <main className="w-full h-full ">
      <Header />
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 m-4 lg:m-10 dark:text-black">
        <div>
          <h1 className="font-special text-2xl m-6">Organisationer</h1>
        </div>
        <section className="flex w-full h-40 bg-gray-100 p-4 rounded-lg">
          <img
            src="/räv.jpg"
            alt="Bild och/eller logga till djurorganisation"
            className="w-1/3 h-full object-cover mr-4"
          />
          <div className="flex flex-col  overflow-hidden">
            <h1 className="text-xl font-semibold truncate">Djurvännerna</h1>
            <p className="text-sm truncate">
              Hej! Vi är en organisation som främst hjälper hemlösa hundar och
              de stackarna som har blivit lämnade eller bortsprugna där ingen
              ägare har hittats, vi tar även hand om hundar vars ägare har gått
              bort. Vi är en ideell organisation som lever på era bidrag, stöd
              oss eller adoptera en av våra fina hundar.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
