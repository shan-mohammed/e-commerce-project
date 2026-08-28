import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
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

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }
    const loggedInUser =JSON.parse(
      localStorage.getItem("loggedInUser")
    );
    if(!loggedInUser){
      navigate("/login");
      return;
    }

    const order = {
      id: `ORD-${Date.now()}`,
      userId :loggedInUser.id,
      userEmail :loggedInUser.email,
      
      date: new Date().toLocaleDateString(),
      status: "Processing",
      customer: formData,
      items: cartItems,
      total: totalAmount,
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, order])
    );

    // Clear cart
    dispatch(clearCart());

    // Go to Orders page
    navigate("/profile/orders");
  };

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
            className="mt-6 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Delivery Details */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">

          <h2 className="text-xl font-semibold mb-6">
            Delivery Address
          </h2>

          <form onSubmit={handlePlaceOrder}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                  placeholder="Enter phone number"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

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
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                  placeholder="Enter pincode"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition"
            >
              Place Order
            </button>

          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 h-fit">

          <h2 className="text-xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="flex gap-3 border-b pb-4"
              >

                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div className="flex-1">

                  <h3 className="font-medium line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>

                  <p className="font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>

                </div>

              </div>

            ))}

          </div>

          <div className="border-t mt-6 pt-4">

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>

              <span className="text-teal-600">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;