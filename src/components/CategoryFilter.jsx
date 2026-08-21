import { useEffect, useState } from "react";

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category-list"
        );

        const data = await response.json();
        setCategories(data);

        console.log("Categories:", data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">
        Categories
      </h2>

      {/* All Categories */}
      <button
        onClick={() => setSelectedCategory("")}
        className={`w-full text-left px-3 py-2 rounded mb-1 ${
          selectedCategory === ""
            ? "bg-teal-500 text-white"
            : "hover:bg-gray-100"
        }`}
      >
        All Categories
      </button>

      {/* Categories */}
      <div className="space-y-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`w-full text-left px-3 py-2 rounded capitalize ${
              selectedCategory === category
                ? "bg-teal-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {category.replace("-", " ")}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;