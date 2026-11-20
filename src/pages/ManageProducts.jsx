import { useOutletContext, useNavigate } from "react-router-dom";
import { deleteProduct } from "../../services/productApi";

const ManageProducts = () => {
  const { products = [], refreshProducts } = useOutletContext() || {};
  const navigate = useNavigate();

  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteProduct(_id);

      await refreshProducts();

      alert(response.message || "Product deleted successfully");
    } catch (error) {
      console.error("Delete product error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to delete product"
      );
    }
  };

  return (
    <div className="w-full min-w-0 p-3 sm:p-5 lg:p-6">

      {/* Heading */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Manage Products
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-1">
            View, edit and delete your products.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/add-product")}
          className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base font-medium"
        >
          + Add Product
        </button>

      </div>

      {/* Product Count */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 mb-5 sm:mb-6">
        <p className="text-sm text-gray-500">
          Total Products
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900">
          {products.length}
        </h2>
      </div>

      {/* Empty State */}
      {products.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-500 text-sm sm:text-base">
            No products found.
          </p>

          <button
            onClick={() => navigate("/admin/add-product")}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <>
          {/* Mobile Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">

            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition"
              >

                {/* Product Image and Details */}
                <div className="flex items-center gap-4">

                  <img
                    src={product.imageUrl || "/placeholder.png"}
                    alt={product.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg bg-gray-50 shrink-0"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {product.category}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-500">
                      Brand: {product.brand || "Other"}
                    </p>

                    <p className="font-bold text-gray-900 mt-2">
                      ₹{product.price}
                    </p>

                    <p className="text-yellow-600 text-sm">
                      ⭐ {product.rating || 0}
                    </p>
                  </div>

                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4 pt-3 border-t">

                  <button
                    onClick={() =>
                      navigate(`/admin/edit-product/${product._id}`)
                    }
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* Tablet and Desktop Table */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full min-w-850px text-left">

                <thead className="bg-gray-100 text-gray-600 text-sm">
                  <tr>
                    <th className="p-4">Image</th>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Brand</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-t hover:bg-gray-50 transition"
                    >

                      <td className="p-4">
                        <img
                          src={product.imageUrl || "/placeholder.png"}
                          alt={product.title}
                          className="w-14 h-14 object-contain rounded-lg bg-gray-50"
                        />
                      </td>

                      <td className="p-4 font-medium text-gray-800">
                        {product.title}
                      </td>

                      <td className="p-4 text-gray-600">
                        {product.category}
                      </td>

                      <td className="p-4 text-gray-600">
                        {product.brand || "Other"}
                      </td>

                      <td className="p-4 font-semibold whitespace-nowrap">
                        ₹{product.price}
                      </td>

                      <td className="p-4 text-yellow-600 whitespace-nowrap">
                        ⭐ {product.rating || 0}
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              navigate(`/admin/edit-product/${product._id}`)
                            }
                            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(product._id)}
                            className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition text-sm"
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default ManageProducts;