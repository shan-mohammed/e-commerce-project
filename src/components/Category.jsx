const CategoryFilter = ({
  filters,
  setFilters,
  categories,
}) => {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-3">
        Category
      </h3>

      <select
        value={filters.category}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            category: e.target.value,
          }))
        }
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <option value="all">
          All Categories
        </option>

        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;