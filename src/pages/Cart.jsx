import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../redux/cartSlice";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total quantity
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <FaShoppingCart className="text-6xl text-gray-300 mb-5" />

        <h2 className="text-2xl font-bold text-gray-800">
          Your Cart is Empty
        </h2>

        <p className="text-gray-500 mt-2 text-center">
          Looks like you haven't added anything to your cart yet.
        </p>

        <Link
          to="/products"
          className="mt-6 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
         My Cart
        </h1>

        <p className="text-gray-500 mt-2">
          {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cart Products */}
        <div className="lg:col-span-2 space-y-5">

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-6"
            >
              <div className="flex flex-col sm:flex-row gap-5">

                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 shrink-0 bg-gray-50 rounded-lg flex items-center justify-center p-3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">

                  <div className="flex justify-between gap-4">
                    <h2 className="font-semibold text-gray-800 text-lg line-clamp-2">
                      {item.title}
                    </h2>

                    {/* Remove */}
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 hover:text-red-700 transition shrink-0"
                      title="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {/* Price */}
                  <p className="text-teal-600 font-bold text-lg mt-2">
                    ₹{item.price.toFixed(2)}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center justify-between mt-5">

                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">

                      <button
                        onClick={() =>
                          dispatch(decreaseQty(item.id))
                        }
                        disabled={item.quantity === 1}
                        className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <FaMinus size={12} />
                      </button>

                      <span className="w-10 text-center font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          dispatch(increaseQty(item.id))
                        }
                        className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      >
                        <FaPlus size={12} />
                      </button>

                    </div>

                    {/* Item Total */}
                    <p className="font-bold text-gray-800">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>

                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <Link
            to="/products"
            className="inline-block text-teal-600 hover:text-teal-700 font-semibold mt-2"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-24">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-600 mb-4">
              <span>Items ({totalItems})</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-600 mb-4">
              <span>Delivery</span>
              <span className="text-green-600 font-semibold">
                FREE
              </span>
            </div>

            <div className="border-t border-gray-300 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-800">
                  Total
                </span>

                <span className="text-2xl font-bold text-teal-600">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition"
              onClick={() => alert("Checkout coming soon!")}
            >
              Proceed to Checkout
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;