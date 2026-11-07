import { useEffect, useState } from "react";
import { getMyOrders } from "../../services/orderApi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch customer orders from MongoDB
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const loggedInUser = JSON.parse(
        localStorage.getItem("loggedInUser") || "null"
      );

      if (!loggedInUser) {
        setOrders([]);
        setErrorMessage("Please log in to view your orders.");
        return;
      }

      // Call backend API
      const response = await getMyOrders();

      if (response.success) {
        setOrders(response.data || []);
      } else {
        setErrorMessage(
          response.message || "Unable to retrieve your orders."
        );
      }
    } catch (error) {
      console.error("Error fetching orders:", error);

      setErrorMessage(
        error.response?.data?.message ||
          "Unable to load orders. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500 mx-auto"></div>

        <p className="mt-4 text-gray-500">
          Loading your orders...
        </p>
      </div>
    );
  }

  // Error state
  if (errorMessage) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <p className="text-red-600 mb-4">
          {errorMessage}
        </p>

        <button
          onClick={fetchOrders}
          className="bg-teal-500 text-white px-5 py-2 rounded-lg hover:bg-teal-600 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">

      <h1 className="text-2xl font-bold mb-6">
        My Orders
      </h1>

      {/* Empty Orders */}
      {orders.length === 0 ? (
        <div className="text-center py-12">

          <div className="text-5xl mb-4">
            📦
          </div>

          <h2 className="text-xl font-semibold">
            No Orders Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Your orders will appear here.
          </p>

        </div>
      ) : (

        <div className="space-y-6">

          {orders.map((order) => {

            const orderId = order._id;
            const orderDate = order.createdAt || order.date;

            return (
              <div
                key={orderId}
                className="border rounded-xl p-4 sm:p-5"
              >

                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4">

                  <div className="min-w-0">

                    <h3 className="font-semibold text-lg break-all">
                      Order #{orderId}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Ordered on:{" "}
                      {orderDate
                        ? new Date(orderDate).toLocaleString()
                        : "Date unavailable"}
                    </p>

                  </div>

                  <span
                    className={`w-fit px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status || "Processing"}
                  </span>

                </div>

                {/* Products */}
                <div className="mt-5 space-y-4">

                  <h4 className="font-semibold">
                    Products
                  </h4>

                  {order.items?.map((item, itemIndex) => {

                    const quantity = Number(item.quantity) || 1;
                    const price = Number(item.price) || 0;

                    return (
                      <div
                        key={item._id || item.productId || itemIndex}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border-b pb-4"
                      >

                        <img
                          src={item.imageUrl || "/placeholder.png"}
                          alt={item.title || "Product"}
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.png";
                          }}
                          className="w-20 h-20 object-contain rounded-lg bg-gray-50 shrink-0"
                        />

                        <div className="flex-1 min-w-0">

                          <h5 className="font-medium wrap-break-words">
                            {item.title}
                          </h5>

                          <p className="text-sm text-gray-500 mt-1">
                            Quantity: {quantity}
                          </p>

                          <p className="font-semibold mt-1">
                            ₹{price.toFixed(2)}
                          </p>

                        </div>

                        <div className="font-semibold sm:text-right">
                          ₹{(price * quantity).toFixed(2)}
                        </div>

                      </div>
                    );
                  })}

                </div>

                {/* Delivery Address */}
                {order.customer && (
                  <div className="mt-5 bg-gray-50 rounded-lg p-4">

                    <h4 className="font-semibold mb-2">
                      Delivery Address
                    </h4>

                    <p className="text-sm text-gray-600">
                      {order.customer.name}
                    </p>

                    <p className="text-sm text-gray-600">
                      {order.customer.email || order.userEmail}
                    </p>

                    <p className="text-sm text-gray-600">
                      {order.customer.phone}
                    </p>

                    <p className="text-sm text-gray-600">
                      {order.customer.address}
                    </p>

                    <p className="text-sm text-gray-600">
                      {order.customer.city} - {order.customer.pincode}
                    </p>

                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-center gap-3 mt-5 pt-4 border-t">

                  <span className="text-lg font-semibold">
                    Total
                  </span>

                  <span className="text-xl font-bold text-teal-600 whitespace-nowrap">
                    ₹{Number(order.total || 0).toFixed(2)}
                  </span>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default Orders;