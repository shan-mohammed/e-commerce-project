import React, { useEffect,useState } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaHome,
} from "react-icons/fa";

const Navbar = ({
  filterOpen,
  setFilterOpen,
  filters,
  setFilters,
  categories,
  brands,
  clearFilters,
  search,
  setSearch,
}) => {

  const navigate= useNavigate()
  const [categoryOpen, setCategoryOpen] = useState(false);
  // cart

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

//  body scroll

  useEffect(() => {
    if (filterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [filterOpen]);

  // =========================
  // NAV LINK STYLE
  // =========================

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-teal-500 font-semibold border-b-2 border-teal-500 pb-1"
      : "text-gray-700 hover:text-teal-500 transition";

// category change

  const handleCategoryChange = (e) => {
    const value = e.target.value;

    setFilters((prev) => ({
      ...prev,
      category: value,
    }));
     setFilterOpen(false);
    navigate ("/products")
  };
//  price change

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);

    setFilters((prev) => ({
      ...prev,
      maxPrice: value,
    }));
  };

//  brand change

  const handleBrandChange = (brand) => {
    setFilters((prev) => {
      const isSelected = prev.brands.includes(brand);

      if (isSelected) {
        return {
          ...prev,
          brands: prev.brands.filter(
            (item) => item !== brand
          ),
        };
      }

      return {
        ...prev,
        brands: [...prev.brands, brand],
      };
    });
  };

  // rating change

  const handleRatingChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      rating: value,
    }));
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

   {/* overlay */}

      <div
        className={`fixed inset-0 bg-black/40 transition-all duration-300 z-40 ${
          filterOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
        onClick={() => setFilterOpen(false)}
      ></div>

     {/* filter sidebar */}

      <div
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-80 bg-white shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${
          filterOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* SIDEBAR HEADER */}

        <div className="flex items-center justify-between px-6 py-5 border-b">

          <h2 className="text-2xl font-bold">
            Filters
          </h2>

          <button
            onClick={() => setFilterOpen(false)}
            className="text-2xl text-gray-500 hover:text-red-500 transition"
          >
            ✕
          </button>

        </div>
{/* filter content */}

        <div className="h-[calc(100%-145px)] overflow-y-auto">

          <div className="px-6 py-6 space-y-8">

{/* CATEGORY */}
<div className="w-full min-w-0">

  <h3 className="font-semibold text-lg mb-3">
    Category
  </h3>

  <div className="relative w-full">

    <button
      type="button"
      onClick={() =>
        setCategoryOpen((prev) => !prev)
      }
      className="w-full min-w-0 flex items-center justify-between
      gap-2 border border-gray-400 rounded-lg
      px-3 py-2.5 text-sm sm:text-base
      bg-white text-left
      focus:outline-none focus:ring-2 focus:ring-teal-500"
    >
      <span className="truncate">
        {filters.category === "all"
          ? "All Categories"
          : filters.category}
      </span>

      <span className="flex-shrink-0">
        ▼
      </span>
    </button>

    {categoryOpen && (
      <div
        className="absolute left-0 right-0 top-full mt-2
        bg-white border border-gray-300 rounded-lg
        shadow-lg z-[100]
        max-h-56 overflow-y-auto overflow-x-hidden"
      >

        {/* All Categories */}

        <button
          type="button"
          onClick={() => {
            setFilters((prev) => ({
              ...prev,
              category: "all",
            }));

            setCategoryOpen(false);
            setFilterOpen(false);
            navigate("/products");
          }}
          className="w-full text-left px-3 py-2.5
          text-sm sm:text-base
          hover:bg-gray-100 truncate"
        >
          All Categories
        </button>

        {/* Categories */}

        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setFilters((prev) => ({
                ...prev,
                category: category,
              }));

              setCategoryOpen(false);
              setFilterOpen(false);
              navigate("/products");
            }}
            className="w-full text-left px-3 py-2.5
            text-sm sm:text-base
            hover:bg-gray-100 truncate"
          >
            {category}
          </button>
        ))}

      </div>
    )}

  </div>

</div>
          {/* price */}

            <div>

              <h3 className="font-semibold text-lg mb-3">
                Price
              </h3>

              <input
                type="range"
                min="0"
                max="1500"
                value={filters.maxPrice}
                onChange={handlePriceChange}
                className="w-full accent-teal-500 cursor-pointer"
              />

              <div className="flex justify-between text-sm text-gray-500 mt-2">

                <span>
                  ₹0
                </span>

                <span>
                  ₹{filters.maxPrice}
                </span>

              </div>

            </div>

            {/* brand */}

            <div>

              <h3 className="font-semibold text-lg mb-3">
                Brand
              </h3>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">

                {brands && brands.length > 0 ? (

                  brands.map((brand) => (

                    <label
                      key={brand}
                      className="flex items-center gap-3 cursor-pointer"
                    >

                      <input
                        type="checkbox"
                        checked={filters.brands.includes(
                          brand
                        )}
                        onChange={() =>
                          handleBrandChange(brand)
                        }
                        className="w-4 h-4 accent-teal-500"
                      />

                      <span className="text-sm text-gray-700">
                        {brand}
                      </span>

                    </label>

                  ))

                ) : (

                  <p className="text-sm text-gray-500">
                    Loading brands...
                  </p>

                )}

              </div>

            </div>

{/* rating */}

            <div>

              <h3 className="font-semibold text-lg mb-3">
                Rating
              </h3>

              {[4, 3, 2, 1].map((value) => (

                <label
                  key={value}
                  className="flex items-center gap-2 mb-3 cursor-pointer"
                >

                  <input
                    type="radio"
                    name="rating"
                    checked={
                      filters.rating === value
                    }
                    onChange={() =>
                      handleRatingChange(value)
                    }
                    className="accent-teal-500"
                  />

                  <span className="text-yellow-500 tracking-wide">
                    {"★".repeat(value)}
                  </span>

                  <span className="text-sm text-gray-500">
                    & above
                  </span>

                </label>

              ))}

              {/* CLEAR RATING */}

              {filters.rating > 0 && (
                <button
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      rating: 0,
                    }))
                  }
                  className="text-sm text-teal-500 hover:text-teal-700"
                >
                  Clear rating
                </button>
              )}

            </div>

          </div>

        </div>

    {/* clear All filters */}

        <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-5">

          <button
            onClick={clearFilters}
            className="w-full bg-teal-500 hover:bg-teal-600
            text-white py-3 rounded-lg font-medium transition"
          >
            Clear All Filters
          </button>

        </div>

      </div>

   {/* top navbar */}
      <div className="px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* LOGO */}

        <NavLink to="/" className="text-3xl font-bold">

          <span className="text-teal-500">
            WE
          </span>

          <span className="text-gray-800">
            SHOP
          </span>

        </NavLink>

        {/* SEARCH */}

        <div className="relative w-full md:w-1/2">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-6">

          {/* LOGIN */}

          <NavLink
            to="/login"
            className="flex items-center gap-2 text-gray-700 hover:text-teal-500 transition"
          >

            <FaUser />

            <span>
              Login
            </span>

          </NavLink>

          {/* CART */}

          <NavLink
            to="/cart"
            className="relative flex items-center gap-2 text-gray-700 hover:text-teal-500 transition"
          >

            <FaShoppingCart size={20} />

            <span>
              Cart
            </span>

            <span
              className="absolute -top-2 -right-3 bg-red-500 text-white
              text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {cartCount}
            </span>

          </NavLink>

        </div>

      </div>

  
{/* bottum navigation */}
      <div className="border-t bg-gray-50">

        <div className="max-w-7xl mx-auto px-5 py-3 flex gap-8 overflow-x-auto whitespace-nowrap">

          {/* FILTER BUTTON */}

          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 text-gray-700 hover:text-teal-500 transition"
          >

            <FaBars />

            Categories

          </button>

          {/* HOME */}

          <NavLink
            to="/"
            className={navLinkStyle}
          >

            <span className="flex items-center gap-2">

              <FaHome />

              Home

            </span>

          </NavLink>

          {/* PRODUCTS */}

          <NavLink
            to="/products"
            className={navLinkStyle}
          >
            Products
          </NavLink>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;