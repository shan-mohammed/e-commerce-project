import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/productApi";

const SearchBar = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    const searchValue = search.trim().toLowerCase();

    if (!searchValue || loading) return;

    try {
      setLoading(true);

      // Fetch products from backend
      const productsData = await getProducts();

      const products = Array.isArray(productsData)
        ? productsData
        : productsData.products || [];

      // Find matching product
      const matchedProduct =
        products.find(
          (product) =>
            product.title?.trim().toLowerCase() === searchValue
        ) ||
        products.find((product) =>
          product.title?.toLowerCase().includes(searchValue)
        );

      if (matchedProduct) {
        navigate(`/products/${matchedProduct._id || matchedProduct.id}`);
      } else {
        alert("No product available");
      }
    } catch (error) {
      console.error("Product search error:", error);
      alert("Unable to search products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">

      {/* Search Button */}
      <button
        type="submit"
        disabled={loading}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-500 disabled:opacity-50"
      >
        <FaSearch />
      </button>

      {/* Search Input */}
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
      />

    </form>
  );
};

export default SearchBar;