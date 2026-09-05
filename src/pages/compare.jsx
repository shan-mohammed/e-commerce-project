import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCompare,
  clearCompare,
} from "../redux/compareSlice";
import { addToCart } from "../redux/cartSlice";

const Compare = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const compareItems = useSelector(
    (state) => state.compare.items
  );

  // Empty compare
  if (compareItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center py-20">

          <div className="text-6xl mb-5">
            ⚖️
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            No Products to Compare
          </h1>

          <p className="text-gray-500 mt-3">
            Add products to compare their features side by side.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Products
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            ⚖️ Compare Products
          </h1>

          <p className="text-gray-500 mt-1">
            Compare up to 3 products
          </p>
        </div>

        <button
          onClick={() => dispatch(clearCompare())}
          className="border border-red-500 text-red-500 px-5 py-2 rounded-lg hover:bg-red-50 transition"
        >
          Clear All
        </button>

      </div>

      {/* Compare Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">

        <table className="w-full min-w-[700px] border-collapse">

          <thead>
            <tr className="bg-gray-50">

              <th className="text-left p-5 border-b w-40">
                Feature
              </th>

              {compareItems.map((product) => (
                <th
                  key={product.id}
                  className="p-5 border-b text-center"
                >
                  <div className="flex justify-center">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                </th>
              ))}

            </tr>
          </thead>

          <tbody>

            {/* Product Name */}
            <tr>
              <td className="p-5 font-semibold border-b">
                Product
              </td>

              {compareItems.map((product) => (
                <td
                  key={product.id}
                  className="p-5 text-center border-b"
                >
                  <button
                    onClick={() =>
                      navigate(`/products/${product.id}`)
                    }
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {product.title}
                  </button>
                </td>
              ))}
            </tr>

            {/* Brand */}
            <tr>
              <td className="p-5 font-semibold border-b">
                Brand
              </td>

              {compareItems.map((product) => (
                <td
                  key={product.id}
                  className="p-5 text-center border-b"
                >
                  {product.brand || "N/A"}
                </td>
              ))}
            </tr>

            {/* Category */}
            <tr>
              <td className="p-5 font-semibold border-b">
                Category
              </td>

              {compareItems.map((product) => (
                <td
                  key={product.id}
                  className="p-5 text-center border-b capitalize"
                >
                  {product.category || "N/A"}
                </td>
              ))}
            </tr>

            {/* Price */}
            <tr>
              <td className="p-5 font-semibold border-b">
                Price
              </td>

              {compareItems.map((product) => (
                <td
                  key={product.id}
                  className="p-5 text-center border-b"
                >
                  <span className="text-xl font-bold text-green-600">
                    ${product.price}
                  </span>
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr>
              <td className="p-5 font-semibold border-b">
                Rating
              </td>

              {compareItems.map((product) => (
                <td
                  key={product.id}
                  className="p-5 text-center border-b"
                >
                  ⭐ {product.rating}
                </td>
              ))}
            </tr>

            {/* Discount */}
            <tr>
              <td className="p-5 font-semibold border-b">
                Discount
              </td>

              {compareItems.map((product) => (
                <td
                  key={product.id}
                  className="p-5 text-center border-b"
                >
                  {product.discountPercentage
                    ? `${product.discountPercentage}%`
                    : "N/A"}
                </td>
              ))}
            </tr>

            {/* Stock */}
            <tr>
              <td className="p-5 font-semibold border-b">
                Stock
              </td>

              {compareItems.map((product) => (
                <td
                  key={product.id}
                  className="p-5 text-center border-b"
                >
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-medium">
                      ✓ In Stock
                    </span>
                  ) : (
                    <span className="text-red-500 font-medium">
                      ✕ Out of Stock
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Weight */}
            <tr>
              <td className="p-5 font-semibold border-b">
                Weight
              </td>

              {compareItems.map((product) => (
                <td
                  key={product.id}
                  className="p-5 text-center border-b"
                >
                  {product.weight
                    ? `${product.weight} kg`
                    : "N/A"}
                </td>
              ))}
            </tr>

            {/* Actions */}
            <tr>
              <td className="p-5 font-semibold">
                Actions
              </td>

              {compareItems.map((product) => (
                <td
                  key={product.id}
                  className="p-5 text-center"
                >

                  <button
                    onClick={() =>
                      dispatch(addToCart(product))
                    }
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mb-2"
                  >
                    🛒 Add to Cart
                  </button>

                  <button
                    onClick={() =>
                      dispatch(removeFromCompare(product.id))
                    }
                    className="w-full border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition"
                  >
                    Remove
                  </button>

                </td>
              ))}

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Compare;