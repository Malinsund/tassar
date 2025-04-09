"use client";
import { useEffect, useState } from "react";

const categories = [
  { name: "Katter", subcategories: [] },
  { name: "Hundar", subcategories: [] },
  {
    name: "Gnagare",
    subcategories: [
      "Kaniner",
      "Marsvin",
      "Hamster",
      "Råttor",
      "Möss",
      "Övriga gnagare",
    ],
  },
  { name: "Fåglar", subcategories: [] },
  {
    name: "Reptiler",
    subcategories: ["Ormar", "Ödlor", "Spindlar"],
  },
  { name: "Fiskar", subcategories: [] },
];

interface Props {
  onCategorySelect: (category: string) => void;
}

const CategoryList = ({ onCategorySelect }: Props) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  useEffect(() => {}, []);

  return (
    <div className="p-4 rounded-md">
      <h2 className="text-3xl font-special font-semibold mb-2">Kategorier</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.name} className="mb-2">
            <button
              onClick={() => {
                toggleCategory(category.name);
                onCategorySelect(category.name);
              }}
              className="text-2xl font-special font-medium w-full text-left hover:underline"
            >
              {category.name} {category.subcategories.length > 0 && "+"}
            </button>
            {openCategory === category.name &&
              category.subcategories.length > 0 && (
                <ul className="ml-4 mt-1 space-y-1">
                  {category.subcategories.map((sub) => (
                    <li key={sub}>
                      <button
                        onClick={() => onCategorySelect(sub)}
                        className="text-gray-700 text-md font-poppins hover:underline"
                      >
                        - {sub}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
