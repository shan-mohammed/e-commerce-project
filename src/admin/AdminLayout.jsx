import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { useState,useEffect } from "react";
import { getProducts } from "../../services/productApi";

const AdminLayout = () => {
  const[products, setProducts] = useState([]);
  useEffect(()=>{
    const fetchProducts = async()=>{
      try {
        const response = await getProducts();
        setProducts(response.data)
      } catch (error) {
        console.error("Error fetching products:",error)
      }
    }
    fetchProducts()
  },[])
  return (
    <div className="min-h-screen bg-gray-100">

      <AdminNavbar />

      <main className="p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;

