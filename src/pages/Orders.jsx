import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      // Get logged-in user
      const loggedInUser = JSON.parse(
        localStorage.getItem("loggedInUser") || "null"
      );

      if (!loggedInUser) {
        setOrders([]);
        return;
      }

      // Support MongoDB _id and id
      const userId = String(
        loggedInUser._id || loggedInUser.id
      );

      // Get all orders
      const allOrders = JSON.parse(
        localStorage.getItem("orders") || "[]"
      );

      // Show only current user's orders
      const userOrders = allOrders.filter(
        (order) => String(order.userId) === userId
      );

      // Latest orders first
      userOrders.sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      );

      setOrders(userOrders);
    } catch (error) {
      console.error("Error loading orders:", error);
      setOrders([]);
    }
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">

      <h1 className="text-2xl font-bold mb-6">
        My Orders
      </h1>

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

          {orders.map((order, index) => {

            const orderId = order.id || order._id || index + 1;

            return (
              <div
                key={orderId}
                className="border rounded-xl p-5"
              >

                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4">

                  <div>
                    <h3 className="font-semibold text-lg">
                      Order #{orderId}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Ordered on:{" "}
                      {order.date
                        ? new Date(order.date).toLocaleString()
                        : "Date unavailable"}
                    </p>
                  </div>

                  <span className="w-fit px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
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
                        key={item._id || item.id || itemIndex}
                        className="flex items-center gap-4 border-b pb-4"
                      >

                        <img
                          src={
                            item.imageUrl ||
                            "/placeholder.png"
                          }
                          alt={item.title || "Product"}
                          className="w-20 h-20 object-contain rounded-lg bg-gray-50"
                        />

                        <div className="flex-1">

                          <h5 className="font-medium">
                            {item.title}
                          </h5>

                          <p className="text-sm text-gray-500 mt-1">
                            Quantity: {quantity}
                          </p>

                          <p className="font-semibold mt-1">
                            ₹{price.toFixed(2)}
                          </p>

                        </div>

                        <div className="font-semibold">
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
                      {order.customer.email}
                    </p>

                    <p className="text-sm text-gray-600">
                      {order.customer.phone}
                    </p>

                    <p className="text-sm text-gray-600">
                      {order.customer.address}
                    </p>

                    <p className="text-sm text-gray-600">
                      {order.customer.city} -{" "}
                      {order.customer.pincode}
                    </p>

                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-center mt-5 pt-4 border-t">

                  <span className="text-lg font-semibold">
                    Total
                  </span>

                  <span className="text-xl font-bold text-teal-600">
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