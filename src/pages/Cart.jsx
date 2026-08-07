import { useSelector } from "react-redux";

const cartItems = useSelector((state) => state.cart.items);

return (
  <div>
    {cartItems.map((item) => (
      <div key={item.id}>
        <h2>{item.title}</h2>
        <p>₹{item.price}</p>
        <p>Qty: {item.quantity}</p>
      </div>
    ))}
  </div>
);