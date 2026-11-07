import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { trackActivity } from "../../services/activityApi";
import { createOrder } from "../../services/orderApi";
import { useState } from "react";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Calculate total for display
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrorMessage("");
  };

  // Place order in MongoDB
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (cartItems.length === 0) {
      setErrorMessage("Your cart is empty.");
      return;
    }

    let loggedInUser;

    try {
      loggedInUser = JSON.parse(
        localStorage.getItem("loggedInUser") || "null"
      );
    } catch {
      navigate("/login");
      return;
    }

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    if (!loggedInUser.email) {
      setErrorMessage("Unable to identify your account. Please log in again.");
      return;
    }

    const orderItems = cartItems.map((item) => {
      const productId = item._id || item.id;

      return {
        productId,
        quantity: Number(item.quantity) || 1,
      };
    });

    if (orderItems.some((item) => !item.productId)) {
      setErrorMessage("One or more products have an invalid ID.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Send order to MongoDB
      const response = await createOrder({
        userEmail: loggedInUser.email,
        customer: {
          ...formData,
          email: loggedInUser.email,
        },
        items: orderItems,
      });

      if (!response.success) {
        throw new Error(response.message || "Unable to place your order.");
      }

      // Track purchased products for recommendations
      const trackingResults = await Promise.allSettled(
        orderItems.map((item) =>
          trackActivity(item.productId, "purchase")
        )
      );

      trackingResults.forEach((result) => {
        if (result.status === "rejected") {
          console.error("Purchase tracking error:", result.reason);
        }
      });

      // Clear cart only after successful order creation
      dispatch(clearCart());

      alert("Order placed successfully!");

      navigate("/profile/orders");
    } catch (error) {
      console.error("Order placement error:", error);

      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Unable to place your order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>

          <h1 className="text-2xl font-bold">
            Your cart is empty
          </h1>

          <p className="text-gray-500 mt-2">
            Add some products before checkout.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 lg:px-6 py-6 sm:py-10">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8">

        {/* Delivery Details */}
        <div className="min-w-0 lg:col-span-2 bg-white rounded-xl shadow-sm p-4 sm:p-6">

          <h2 className="text-lg sm:text-xl font-semibold mb-6">
            Delivery Address
          </h2>

          <form onSubmit={handlePlaceOrder}>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="block mb-2 font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full min-w-0 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  title="Enter a valid 10-digit phone number"
                  placeholder="Enter phone number"
                  className="w-full min-w-0 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

            </div>

            <div className="mt-4">
              <label className="block mb-2 font-medium">
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Enter your delivery address"
                className="w-full min-w-0 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-y"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

              <div>
                <label className="block mb-2 font-medium">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="Enter city"
                  className="w-full min-w-0 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{6}"
                  title="Enter a valid 6-digit pincode"
                  placeholder="Enter pincode"
                  className="w-full min-w-0 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

            </div>

            {errorMessage && (
              <div className="mt-5 p-3 rounded-lg bg-red-50 text-red-600 text-sm break-words">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-8 bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>

          </form>
        </div>

        {/* Order Summary */}
        <div className="min-w-0 bg-white rounded-xl shadow-sm p-4 sm:p-6 h-fit">

          <h2 className="text-lg sm:text-xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">

            {cartItems.map((item, index) => {
              const productId = item._id || item.id;
              const price = Number(item.price) || 0;
              const quantity = Number(item.quantity) || 1;

              return (
                <div
                  key={productId || index}
                  className="flex gap-3 border-b pb-4"
                >

                  <img
                    src={item.imageUrl || "/placeholder.png"}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.png";
                    }}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg shrink-0"
                  />

                  <div className="flex-1 min-w-0">

                    <h3 className="font-medium line-clamp-2 wrap-break-words">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Qty: {quantity}
                    </p>

                    <p className="font-semibold mt-1">
                      ₹{(price * quantity).toFixed(2)}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

          <div className="border-t mt-6 pt-4">

            <div className="flex justify-between items-center gap-3 text-base sm:text-lg font-bold">
              <span>Total</span>

              <span className="text-teal-600 whitespace-nowrap">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Final order total is calculated and verified by the server.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;