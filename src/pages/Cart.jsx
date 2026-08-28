
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-6xl mb-4">🛒</div>

        <h1 className="text-2xl font-bold text-gray-800">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 mt-2 text-center">
          Looks like you haven't added anything to your cart yet.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="mt-6 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Shopping Cart
          </h1>

          <p className="text-gray-500 mt-1">
            {cartItems.length} item
            {cartItems.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <button
          onClick={() => dispatch(clearCart())}
          className="text-red-500 hover:text-red-700 font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border p-4 flex flex-col sm:flex-row gap-4"
            >
              {/* Product Image */}
              <div className="w-full sm:w-32 h-32 shrink-0 bg-gray-50 rounded-lg flex items-center justify-center">
                <img
                  src={item.thumbnail || item.images?.[0]}
                  alt={item.title}
                  className="w-full h-full object-contain p-3"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">
                      {item.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.category}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>

                {/* Price */}
                <p className="text-teal-600 font-bold text-lg mt-3">
                  ${item.price.toFixed(2)}
                </p>

                {/* Quantity */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => dispatch(decreaseQty(item.id))}
                      className="px-4 py-2 hover:bg-gray-100 text-lg"
                    >
                      −
                    </button>

                    <span className="px-5 py-2 border-x font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => dispatch(increaseQty(item.id))}
                      className="px-4 py-2 hover:bg-gray-100 text-lg"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <p className="font-bold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-600 mb-3">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-600 mb-3">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="border-t pt-4 mt-4 flex justify-between">
              <span className="text-lg font-bold">Total</span>

              <span className="text-xl font-bold text-teal-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate("/products")}
              className="w-full mt-3 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-medium transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

