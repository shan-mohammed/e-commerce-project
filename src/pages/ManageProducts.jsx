import { useOutletContext, useNavigate } from "react-router-dom";
import { deleteProduct } from "../../services/productApi";

const ManageProducts = () => {
const { products, refreshProducts } = useOutletContext();
const navigate = useNavigate();

const handleDelete = async (id) => {
const confirmDelete = window.confirm(
"Are you sure you want to delete this product?"
);

if (!confirmDelete) return;

try {
  const response = await deleteProduct(id);

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

return ( <div className="p-4 md:p-6">

  {/* Heading */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

    <div>
      <h1 className="text-2xl md:text-3xl font-bold">
        Manage Products
      </h1>

      <p className="text-gray-500 mt-1">
        View, edit and delete your products.
      </p>
    </div>

    <button
      onClick={() => navigate("/admin/add-product")}
      className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
    >
      + Add Product
    </button>

  </div>

  {/* Product count */}
  <div className="bg-white rounded-xl shadow p-5 mb-6">
    <p className="text-gray-500">Total Products</p>

    <h2 className="text-3xl font-bold mt-2">
      {products.length}
    </h2>
  </div>

  {/* Products table */}
  <div className="bg-white rounded-xl shadow overflow-x-auto">

    <table className="w-full text-left min-w-[750px]">

      <thead className="bg-gray-100">
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

        {products.length === 0 ? (

          <tr>
            <td
              colSpan="7"
              className="text-center p-8 text-gray-500"
            >
              No products found.
            </td>
          </tr>

        ) : (

          products.map((product) => (

            <tr
              key={product._id}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-4">
                <img
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </td>

              <td className="p-4 font-medium">
                {product.title}
              </td>

              <td className="p-4">
                {product.category}
              </td>

              <td className="p-4">
                {product.brand}
              </td>

              <td className="p-4">
                ₹{product.price}
              </td>

              <td className="p-4">
                ⭐ {product.rating}
              </td>

              <td className="p-4">
                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      navigate(`/admin/edit-product/${product._id}`)
                    }
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>

                </div>
              </td>

            </tr>

          ))

        )}

      </tbody>

    </table>

  </div>

</div>

);
};

export default ManageProducts;
