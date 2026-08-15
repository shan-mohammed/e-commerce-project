import { useEffect, useState } from "react";
import Product from "../components/Product";
import { useOutletContext } from "react-router-dom";

import PriceFilter from "../components/PriceFilter";
import BrandFilter from "../components/BrandFilter";
import RatingFilter from "../components/RatingFilter";
import SortFilter from "../components/SortFilter";

function Products() {
  const {search,setSearch} =useOutletContext()
  const [products, setProducts] = useState([]);
//  filter States
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=200")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error)=> console.error(error))
  }, []);
             
  // Get unique categories
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  // Get unique brands
  const brands = [
    ...new Set(
      products
        .map((product) => product.brand)
        .filter(Boolean)
    ),
  ];

  // Brand checkbox
  const handleBrandChange = (brand) => {
    setSelectedBrands((previous) => {
      if (previous.includes(brand)) {
        return previous.filter((item) => item !== brand);
      }

      return [...previous, brand];
    });
  };

  // Filtering + Sorting
  const filteredProducts = [...products]
    // Search
    .filter((product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
    )

    // Category
    .filter((product) => {
      if (category === "all") {
        return true;
      }

      return product.category === category;
    })

    // Price
    .filter((product) => product.price <= maxPrice)

    // Brand
    .filter((product) => {
      if (selectedBrands.length === 0) {
        return true;
      }

      return selectedBrands.includes(product.brand);
    })

    // Rating
    .filter((product) => product.rating >= rating)

    // Sort
    .sort((a, b) => {
      if (sort === "priceLow") {
        return a.price - b.price;
      }

      if (sort === "priceHigh") {
        return b.price - a.price;
      }

      if (sort === "ratingHigh") {
        return b.rating - a.rating;
      }

      if (sort === "ratingLow") {
        return a.rating - b.rating;
      }

      if (sort === "nameAZ") {
        return a.title.localeCompare(b.title);
      }

      if (sort === "nameZA") {
        return b.title.localeCompare(a.title);
      }

      return 0;
    });

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setMaxPrice(1500);
    setSelectedBrands([]);
    setRating(0);
    setSort("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Our Products
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Product
            key={product.id}
            product={product}
          />
        ))
      ) :(
    <div className="col-span-full flex flex-col items-center justify-center py-20">
      <h2 className="text-2xl font-semibold text-gray-700">
        No products found
      </h2>

      <p className="text-gray-500 mt-2">
        No products match "{search}"
      </p>
    </div>
  )}
      </div>
    </div>
  );
}

export default Products;