import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaTshirt,
  FaLaptop,
  FaGem,
  FaCouch,
   FaHome
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
const cartItems= useSelector((state)=>state.cart.items)
const cartCount = cartItems.reduce(
  (total ,item)=>total +item.quantity,
  0
)
  // Prevent body scrolling when sidebar is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-teal-500 font-semibold border-b-2 border-teal-500 pb-1"
      : "text-gray-700 hover:text-teal-500 transition";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-all duration-300 z-40 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-60
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-2xl font-bold text-teal-500">Categories</h2>

          <button
            onClick={() => setOpen(false)}
            className="text-2xl text-gray-600 hover:text-red-500 transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* Category List */}
        <ul className="py-3">
          <li
            onClick={() => setOpen(false)}
            className="flex items-center gap-4 px-6 py-4 hover:bg-teal-50 cursor-pointer transition"
          >
            <FaTshirt className="text-teal-500" />
            Clothing
          </li>

          <li
            onClick={() => setOpen(false)}
            className="flex items-center gap-4 px-6 py-4 hover:bg-teal-50 cursor-pointer transition"
          >
            <FaLaptop className="text-teal-500" />
            Electronics
          </li>

          <li
            onClick={() => setOpen(false)}
            className="flex items-center gap-4 px-6 py-4 hover:bg-teal-50 cursor-pointer transition"
          >
            <FaGem className="text-teal-500" />
            Jewellery
          </li>

          <li
            onClick={() => setOpen(false)}
            className="flex items-center gap-4 px-6 py-4 hover:bg-teal-50 cursor-pointer transition"
          >
            <FaCouch className="text-teal-500" />
            Furniture
          </li>

          <li
            onClick={() => setOpen(false)}
            className="px-6 py-4 hover:bg-teal-50 cursor-pointer transition"
          >
            👟 Shoes
          </li>

          <li
            onClick={() => setOpen(false)}
            className="px-6 py-4 hover:bg-teal-50 cursor-pointer transition"
          >
            ⌚ Watches
          </li>

          <li
            onClick={() => setOpen(false)}
            className="px-6 py-4 hover:bg-teal-50 cursor-pointer transition"
          >
            🎒 Bags
          </li>
        </ul>
      </div>

      {/* Top Navbar */}
      <div className="px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
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
            className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
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

            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
           {cartCount}
           </span>
          </NavLink>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 py-3 flex gap-8 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 text-gray-700 hover:text-teal-500 "
          >
            <FaBars />
            Categories
          </button>

          <NavLink to="/" className={navLinkStyle} className="flex items-center gap-2 text-gray-700 hover:text-teal-500 ">
          <FaHome/>  Home
           
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