

import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { useState, useEffect } from "react";
import { getProducts } from "../../services/productApi";

const AdminLayout = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();

        console.log("Fetched products:", productsData);

        setProducts(productsData);
      } catch (error) {
        console.error(
          "Error fetching products:",
          error.response?.data || error.message
        );
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <main className="p-6">
        <Outlet context={{ products, setProducts }} />
      </main>
    </div>
  );
};

export default AdminLayout;
