import { useState } from "react";

export default function SearchAndFilter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCityFilter(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 dark:text-black font-poppins">
      <label htmlFor="search" className="relative">
        <input
          type="search"
          id="search"
          placeholder="Sök..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full md:w-2/3 p-2 border-2 border-secondary rounded-md"
        />
      </label>

      <div className="w-full md:w-2/3">
        <select
          value={categoryFilter}
          onChange={handleCategoryChange}
          className="w-full p-2 border-2 border-secondary rounded-md"
        >
          <option value="">Välj kategori</option>
          <option value="dog">Hundar</option>
          <option value="cat">Katter</option>
          <option value="rodent">Gnagare</option>
          <option value="reptile">Reptiler</option>
          <option value="bird">Fåglar</option>
          <option value="other">Andra djur</option>
        </select>
      </div>

      {/* Stadsfilter */}
      <div className="w-full md:w-2/3">
        <select
          value={cityFilter}
          onChange={handleCityChange}
          className="w-full p-2 border-2 border-secondary rounded-md"
        >
          <option value="">Välj stad</option>
          <option value="gothenburg">Göteborg</option>
          <option value="malmo">Malmö</option>
          <option value="stockholm">Stockholm</option>
        </select>
      </div>
    </div>
  );
}
