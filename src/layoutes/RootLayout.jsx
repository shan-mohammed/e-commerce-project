import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  const [products, setProducts] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    category: "all",
    maxPrice: 1500,
    brands: [],
    rating: 0,
    sort: "",
  });

  // Fetch products
 useEffect(() => {
  fetch("https://dummyjson.com/products?limit=200")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      return res.json();
    })
    .then((data) => {
      setProducts(data.products);
    })
    .catch((error) => {
      console.error("Failed to fetch products:", error);
    });
}, []);

  // Categories
  const categories = [
    ...new Set(
      products.map((product) => product.category)
    ),
  ];

  // Brands
  const brands = [
    ...new Set(
      products
        .map((product) => product.brand)
        .filter(Boolean)
    ),
  ];

  // Clear filters
  const clearFilters = () => {
    setSearch("");

    setFilters({
      category: "all",
      maxPrice: 1500,
      brands: [],
      rating: 0,
      sort: "",
    });
  };

  return (
    <div className="min-h-screen">

      <Navbar
        search={search}
        setSearch={setSearch}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        brands={brands}
        clearFilters={clearFilters}
      />

      <main>
        <Outlet
          context={{
            products,
            search,
            setSearch,
            filters,
            setFilters,
            categories,
            brands,
            clearFilters,
          }}
        />
      </main>

      <Footer />

    </div>
  );
};

export default RootLayout;