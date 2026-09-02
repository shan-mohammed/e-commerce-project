import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../redux/wishListSlice";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-6">
        ❤️ My Wishlist
      </h1>

      {/* Empty Wishlist */}
      {wishlistItems.length === 0 ? (
        <div className="text-center py-20">

          <div className="text-6xl mb-4">
            🤍
          </div>

          <h2 className="text-2xl font-semibold">
            Your wishlist is empty
          </h2>

          <p className="text-gray-500 mt-2">
            Save products you like and find them here later.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Products
          </button>

        </div>
      ) : (

        /* Wishlist Products */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {wishlistItems.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >

              {/* Image */}
              <div
                className="h-52 bg-gray-50 flex items-center justify-center p-4 cursor-pointer"
                onClick={() =>
                  navigate(`/products/${product.id}`)
                }
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Details */}
              <div className="p-4">

                <h3 className="font-semibold text-lg line-clamp-2">
                  {product.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {product.brand}
                </p>

                <p className="text-xl font-bold text-green-600 mt-3">
                  ${product.price}
                </p>

                {/* Add to Cart */}
                <button
                  onClick={() =>
                    dispatch(addToCart(product))
                  }
                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>

                {/* Remove */}
                <button
                  onClick={() =>
                    dispatch(removeFromWishlist(product.id))
                  }
                  className="w-full mt-2 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition"
                >
                  Remove
                </button>

              </div>
            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Wishlist;