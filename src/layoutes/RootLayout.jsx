import { useState, useEffect,useCallback } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProducts } from "../../services/productApi";
import Footer from "../components/Footer";

const RootLayout = () => {
  const [products, setProducts] = useState([]);
  const [loading ,setLoading] = useState(true)
  const [filterOpen, setFilterOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    category: "all",
    maxPrice: 100000,
    brands: [],
    rating: 0,
    sort: "",
  });


const refreshProducts= useCallback(async()=>{
  try {
    setLoading(true);
    const data = await getProducts();

    setProducts (data || []);
   
  } catch (error) {
    console.error("Failed to fetch products:",error.response?.data || error.message)
  }finally{
    setLoading(false)
  }

},[])


useEffect(()=>{
  refreshProducts();

},[refreshProducts])

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
      maxPrice: 100000,
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
            loading,
            refreshProducts
          }}
        />
      </main>

      <Footer />

    </div>
  );
};

export default RootLayout;