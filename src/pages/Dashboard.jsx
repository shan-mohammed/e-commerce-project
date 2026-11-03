import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const { products =[] } = useOutletContext() || {};

  const totalProducts = products.length;

  const totalCategories = new Set(
    products.map((product) => product.category)
  ).size;

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-3xl font-bold mt-3">
            {totalProducts}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Categories</h2>
          <p className="text-3xl font-bold mt-3">
            {totalCategories}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Admin Panel</h2>
          <p className="text-xl font-bold mt-3 text-green-600">
            Active
          </p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;