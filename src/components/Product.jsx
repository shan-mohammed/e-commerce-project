import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishListSlice";

function Product({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get wishlist items from Redux
  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  // Check whether this product is already in wishlist
  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      
      {/* Product Image */}
      <div className="relative h-52 flex items-center justify-center bg-gray-50 p-4">

        <img
          src={product.thumbnail}
          alt={product.title}
          onClick={() => navigate(`/products/${product.id}`)}
          className="h-full w-full object-contain cursor-pointer"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center hover:scale-110 transition"
          title={
            isWishlisted
              ? "Remove from Wishlist"
              : "Add to Wishlist"
          }
        >
          <span className="text-2xl">
            {isWishlisted ? "❤️" : "🤍"}
          </span>
        </button>

      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2">
          {product.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {product.brand}
        </p>

        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold text-green-600">
            ${product.price}
          </p>

          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm font-medium">
            ⭐ {product.rating}
          </span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => dispatch(addToCart(product))}
          className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;