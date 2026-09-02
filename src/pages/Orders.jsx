import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // get current loggedIn user
    const loggedInUser=JSON.parse(
      localStorage.getItem("loggedInUser") 
    );
    const allOrders =JSON.parse(
      localStorage.getItem("orders") || "[]"
    );
    if(!loggedInUser){
      setOrders([]);
      return;
    }

   

    //  Show only orders belonging to the logged in user
    const userOrders = allOrders.filter(
      (order) => order.userId ===loggedInUser.id
    )
    setOrders(userOrders);
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

          {orders.map((order) => (

            <div
              key={order.id}
              className="border rounded-xl p-5"
            >

              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4">

                <div>
                  <h3 className="font-semibold text-lg">
                    Order #{order.id}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Ordered on: {order.date}
                    {/* {new Date(order.date).toLocaleString()} */}
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

                {order.items?.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b pb-4"
                  >

                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-20 object-contain rounded-lg bg-gray-50"
                    />

                    <div className="flex-1">

                      <h5 className="font-medium">
                        {item.title}
                      </h5>

                      <p className="text-sm text-gray-500 mt-1">
                        Quantity: {item.quantity}
                      </p>

                      <p className="font-semibold mt-1">
                        ₹{item.price}
                      </p>

                    </div>

                    <div className="font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>

                  </div>

                ))}

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
                     {order.customer.email} </p>

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
                  ₹{Number(order.total).toFixed(2)}
                </span>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default Orders;