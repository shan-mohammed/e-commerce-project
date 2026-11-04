import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {FaHome}  from "react-icons/fa";


const AdminNavbar = () => {
  const navigate = useNavigate();
const {logout} =useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkStyle = ({ isActive }) =>
    `inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
      isActive
        ? "bg-blue-600 text-white font-semibold"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <h1 className="text-xl font-bold">
          Admin Panel
        </h1>

        <div className="flex items-center gap-4">

          <NavLink to="/admin/dashboard" className={linkStyle}>
           Admin Dashboard
          </NavLink>

          <NavLink to="/admin/add-product" className={linkStyle}>
            Add Product
          </NavLink>

          <NavLink to="/admin/products" className={linkStyle}>
            Manage Products
          </NavLink>
       <NavLink
  to="/"
  className={linkStyle}
>
  <FaHome className="text-lg" />
  <span>Home</span>
</NavLink>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
};

export default AdminNavbar;