import { useOutletContext } from "react-router-dom";
import Product from "../components/Product";

function Products() {
  const {
    products,
    search,
    filters,
    setFilters,
  } = useOutletContext();

  // --------------------------------
  // Filtering + Sorting
  // --------------------------------

  const filteredProducts = [...products]

    // Search
    .filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
    )

    // Category
    .filter((product) => {
      if (filters.category === "all") {
        return true;
      }

      return product.category === filters.category;
    })

    // Price
    .filter((product) => {
      return product.price <= filters.maxPrice;
    })

    // Brand
    .filter((product) => {
      if (filters.brands.length === 0) {
        return true;
      }

      return filters.brands.includes(product.brand);
    })

    // Rating
    .filter((product) => {
      return product.rating >= filters.rating;
    })

    // Sorting
    .sort((a, b) => {

      if (filters.sort === "priceLow") {
        return a.price - b.price;
      }

      if (filters.sort === "priceHigh") {
        return b.price - a.price;
      }

      if (filters.sort === "ratingHigh") {
        return b.rating - a.rating;
      }

      if (filters.sort === "ratingLow") {
        return a.rating - b.rating;
      }

      if (filters.sort === "nameAZ") {
        return a.title.localeCompare(b.title);
      }

      if (filters.sort === "nameZA") {
        return b.title.localeCompare(a.title);
      }

      return 0;
    });

  // --------------------------------
  // Clear Filters
  // --------------------------------

  const clearFilters = () => {
    setFilters({
      category: "all",
      maxPrice: 1500,
      brands: [],
      rating: 0,
      sort: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Our Products
      </h1>

      {/* Active Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">

        {/* Category */}
        {filters.category !== "all" && (
          <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
            Category: {filters.category}
          </span>
        )}

        {/* Price */}
        {filters.maxPrice < 1500 && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            Max Price: ₹{filters.maxPrice}
          </span>
        )}

        {/* Rating */}
        {filters.rating > 0 && (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
            Rating: {filters.rating}+
          </span>
        )}

        {/* Brands */}
        {filters.brands.length > 0 && (
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
            Brands: {filters.brands.length}
          </span>
        )}

        {/* Clear */}
        {(filters.category !== "all" ||
          filters.maxPrice < 1500 ||
          filters.rating > 0 ||
          filters.brands.length > 0 ||
          filters.sort !== "" ||
          search !== "") && (
          <button
            onClick={clearFilters}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Clear Filters
          </button>
        )}

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product) => (
            <Product
              key={product.id}
              product={product}
            />
          ))

        ) : (

          <div className="col-span-full flex flex-col items-center justify-center py-20">

            <h2 className="text-2xl font-semibold text-gray-700">
              No products found
            </h2>

            <p className="text-gray-500 mt-2">
              No products match your filters
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 bg-teal-500 text-white px-5 py-2 rounded-lg hover:bg-teal-600"
            >
              Clear Filters
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default Products;