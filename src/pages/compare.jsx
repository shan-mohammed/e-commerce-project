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

  // Get MongoDB product ID
  const getProductId = (product) => product._id || product.id;

  // Format price in Indian currency
  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });

  // Comparison features
  const features = [
    {
      label: "Brand",
      getValue: (product) => product.brand || "N/A",
    },
    {
      label: "Category",
      getValue: (product) => product.category || "N/A",
    },
    {
      label: "Price",
      getValue: (product) => formatPrice(product.price),
    },
    {
      label: "Rating",
      getValue: (product) =>
        product.rating ? `⭐ ${product.rating} / 5` : "Not rated",
    },
  ];

  // Empty compare
  if (compareItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-5">⚖️</div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
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
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-10">

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              ⚖️ Compare Products
            </h1>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Compare up to 3 products side by side.
            </p>
          </div>

          <button
            onClick={() => dispatch(clearCompare())}
            className="border border-red-500 text-red-500 px-5 py-2 rounded-lg hover:bg-red-50 transition"
          >
            Clear All
          </button>

        </div>

        {/* MOBILE AND TABLET VIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-5">

          {compareItems.map((product) => (
            <div
              key={getProductId(product)}
              className="bg-white rounded-xl shadow-md overflow-hidden p-4 sm:p-5"
            >

              {/* Product image */}
              <div className="h-44 sm:h-48 flex items-center justify-center bg-gray-50 rounded-lg mb-4 p-3">

                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />

              </div>

              {/* Product title */}
              <button
                onClick={() =>
                  navigate(`/products/${getProductId(product)}`)
                }
                className="font-semibold text-gray-800 text-lg text-left hover:text-blue-600 line-clamp-2"
              >
                {product.title}
              </button>

              {/* Product details */}
              <div className="mt-4 space-y-3">

                {features.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex justify-between items-center gap-3 border-b pb-3"
                  >

                    <span className="text-sm text-gray-500">
                      {feature.label}
                    </span>

                    <span
                      className={`text-sm text-right ${
                        feature.label === "Price"
                          ? "font-bold text-green-600"
                          : "font-medium text-gray-700"
                      }`}
                    >
                      {feature.getValue(product)}
                    </span>

                  </div>
                ))}

              </div>

              {/* Actions */}
              <div className="mt-5 flex flex-col gap-3">

                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                >
                  🛒 Add to Cart
                </button>

                <button
                  onClick={() =>
                    dispatch(removeFromCompare(getProductId(product)))
                  }
                  className="w-full border border-red-500 text-red-500 py-2.5 rounded-lg hover:bg-red-50 transition text-sm font-medium"
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden">

          <div className="overflow-x-auto">

            <div
              className="min-w-[750px]"
              style={{
                display: "grid",
                gridTemplateColumns: `160px repeat(${compareItems.length}, minmax(190px, 1fr))`,
              }}
            >

              {/* Product heading */}
              <div className="p-5 border-b bg-gray-50 flex items-center font-semibold text-gray-700">
                Products
              </div>

              {compareItems.map((product) => (
                <div
                  key={getProductId(product)}
                  className="p-5 border-b border-l text-center"
                >

                  <div className="h-44 flex items-center justify-center mb-3">

                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain"
                    />

                  </div>

                  <button
                    onClick={() =>
                      navigate(`/products/${getProductId(product)}`)
                    }
                    className="font-semibold text-blue-600 hover:underline line-clamp-2"
                  >
                    {product.title}
                  </button>

                </div>
              ))}

              {/* Comparison features */}
              {features.map((feature) => (
                <div key={feature.label} className="contents">

                  <div className="p-5 border-b bg-gray-50 font-semibold text-gray-700 flex items-center">
                    {feature.label}
                  </div>

                  {compareItems.map((product) => (
                    <div
                      key={getProductId(product)}
                      className="p-5 border-b border-l flex items-center justify-center text-center text-gray-700"
                    >

                      <span
                        className={
                          feature.label === "Price"
                            ? "text-lg font-bold text-green-600"
                            : ""
                        }
                      >
                        {feature.getValue(product)}
                      </span>

                    </div>
                  ))}

                </div>
              ))}

              {/* Actions */}
              <div className="p-5 bg-gray-50 font-semibold text-gray-700 flex items-center">
                Actions
              </div>

              {compareItems.map((product) => (
                <div
                  key={getProductId(product)}
                  className="p-5 border-l flex flex-col gap-3"
                >

                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                  >
                    🛒 Add to Cart
                  </button>

                  <button
                    onClick={() =>
                      dispatch(removeFromCompare(getProductId(product)))
                    }
                    className="w-full border border-red-500 text-red-500 py-2.5 rounded-lg hover:bg-red-50 transition text-sm font-medium"
                  >
                    Remove
                  </button>

                </div>
              ))}

            </div>

          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">

          <button
            onClick={() => navigate("/products")}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
          >
            Continue Shopping
          </button>

        </div>

      </div>
    </div>
  );
};

export default Compare;