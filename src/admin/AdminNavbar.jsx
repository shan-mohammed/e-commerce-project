import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
      isActive
        ? "bg-blue-600 text-white font-semibold"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  const navLinks = [
    { to: "/admin/dashboard", label: "Admin Dashboard" },
    { to: "/admin/add-product", label: "Add Product" },
    { to: "/admin/products", label: "Manage Products" },
    {to:"/admin/users", label:"Manage Users"}
  ];

  return (
    <nav className="bg-gray-900 text-white px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto">

        {/* Navbar Header */}
        <div className="flex items-center justify-between">

          <h1 className="text-lg sm:text-xl font-bold whitespace-nowrap">
            Admin Panel
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">

            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkStyle}
              >
                {link.label}
              </NavLink>
            ))}

            <NavLink to="/" className={linkStyle}>
              <FaHome className="text-lg" />
              <span>Home</span>
            </NavLink>

            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition whitespace-nowrap"
            >
              Logout
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-2xl p-2 rounded-lg hover:bg-gray-700 transition"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* Mobile and Tablet Navigation */}
        {menuOpen && (
          <div className="lg:hidden flex flex-col gap-2 mt-4 pt-4 border-t border-gray-700">

            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkStyle}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            <NavLink
              to="/"
              className={linkStyle}
              onClick={() => setMenuOpen(false)}
            >
              <FaHome className="text-lg" />
              <span>Home</span>
            </NavLink>
             
             <NavLink
  to="/admin/users"
  className={({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100"
    }`
  }
>
  <FaUsers />
  Manage Users
</NavLink>
            <button
              onClick={handleLogout}
              className="w-full text-left bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>

          </div>
        )}

      </div>
    </nav>
  );
};

export default AdminNavbar;