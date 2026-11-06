import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const { products = [] } = useOutletContext() || {};

  // Total products
  const totalProducts = products.length;

  // Total unique categories
  const totalCategories = new Set(
    products.map((product) => product.category).filter(Boolean)
  ).size;

  // Total unique brands
  const totalBrands = new Set(
    products.map((product) => product.brand).filter(Boolean)
  ).size;

  // Average product rating (ignoring unrated products)
  const ratedProducts = products.filter(
    (product) => Number(product.rating) > 0
  );

  const averageRating = ratedProducts.length
    ? (
        ratedProducts.reduce(
          (total, product) => total + Number(product.rating),
          0
        ) / ratedProducts.length
      ).toFixed(1)
    : "0.0";

  // Latest 5 products
  const recentProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    )
    .slice(0, 5);

  // Dashboard statistics
  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      color: "text-blue-600",
    },
    {
      title: "Total Categories",
      value: totalCategories,
      color: "text-purple-600",
    },
    {
      title: "Total Brands",
      value: totalBrands,
      color: "text-orange-600",
    },
    {
      title: "Average Rating",
      value: `⭐ ${averageRating}`,
      color: "text-yellow-600",
    },
    {
      title: "Admin Panel",
      value: "Active",
      color: "text-green-600",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Dashboard Heading */}
      <h1 className="text-3xl font-bold text-gray-900">
        Admin Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">

        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-gray-500 text-sm font-medium">
              {stat.title}
            </h2>

            <p className={`text-3xl font-bold mt-4 ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}

      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Recent Products
        </h2>

        {recentProducts.length === 0 ? (
          <p className="text-gray-500">
            No products available.
          </p>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b text-gray-500 text-sm">
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Brand</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Rating</th>
                </tr>
              </thead>

              <tbody>

                {recentProducts.map((product) => (

                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="py-3 px-4">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-14 h-14 object-contain rounded-lg"
                      />
                    </td>

                    <td className="py-3 px-4 font-medium text-gray-800">
                      {product.title}
                    </td>

                    <td className="py-3 px-4 text-gray-600">
                      {product.category}
                    </td>

                    <td className="py-3 px-4 text-gray-600">
                      {product.brand}
                    </td>

                    <td className="py-3 px-4 font-semibold">
                      {product.price}
                    </td>

                    <td className="py-3 px-4 text-yellow-600">
                      ⭐ {product.rating || 0}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
};

export default Dashboard;