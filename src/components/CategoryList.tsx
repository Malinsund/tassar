/* interface Category {
  id: string;
  name: string;
}

interface CategoryListProps {
  categories: Category[];
  onSelect: (categoryId: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onSelect,
}) => {
  return (
    <div className="bg-blue-300 p-4">
      <h1 className="text-2xl font-bold">Kategorier</h1>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => onSelect(category.id)}
            className="cursor-pointer p-2 hover:bg-blue-400"
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
 */
