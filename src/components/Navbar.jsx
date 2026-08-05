import React from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-teal-500 font-semibold border-b-2 border-teal-500 pb-1"
      : "text-gray-700 hover:text-teal-500 transition";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <h1 className="text-3xl font-bold cursor-pointer">
          <span className="text-teal-500">WE</span>
          <span className="text-gray-800">SHOP</span>
        </h1>

        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <input
            type="search"
            placeholder="Search products..."
            className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-teal-500"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-500" />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/login"
            className="flex items-center gap-2 text-gray-700 hover:text-teal-500"
          >
            <FaUser />
            Login
          </NavLink>

          <NavLink
            to="/cart"
            className="relative flex items-center gap-2 text-gray-700 hover:text-teal-500"
          >
            <FaShoppingCart size={20} />
            Cart

            {/* Cart Count */}
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2">
              0
            </span>
          </NavLink>
        </div>
      </div>

      {/* Categories */}
      <div className="border-t bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 py-3 flex gap-8 overflow-x-auto whitespace-nowrap">
          <NavLink to="/products" className={navLinkStyle}>
            All
          </NavLink>

          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkStyle}>
            Products
          </NavLink>

          <NavLink to="/products/fashion" className={navLinkStyle}>
            Fashion
          </NavLink>

          <NavLink to="/products/electronics" className={navLinkStyle}>
            Electronics
          </NavLink>

          <NavLink to="/products/jewellery" className={navLinkStyle}>
            Jewellery
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;