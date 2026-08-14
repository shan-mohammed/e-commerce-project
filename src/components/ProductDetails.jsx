import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaBolt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";


const ProductDetails = () => {

  const { id } = useParams();
  const dispatch= useDispatch();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <section className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Images */}
          <div>

            <div className="relative bg-gray-100 rounded-lg flex justify-center items-center h-105">

              <img
                src={product.images[currentImage]}
                alt={product.title}
                className="max-h-full object-contain"
              />

              <button
                onClick={prevImage}
                className="absolute left-3 bg-white shadow rounded-full w-10 h-10 text-xl hover:bg-gray-200"
              >
                ◀
              </button>

              <button
                onClick={nextImage}
                className="absolute right-3 bg-white shadow rounded-full w-10 h-10 text-xl hover:bg-gray-200"
              >
                ▶
              </button>
            </div>

            {/* Thumbnails */}

            <div className="flex gap-3 mt-5 overflow-x-auto">

              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() => setCurrentImage(index)}
                  className={`w-20 h-20 rounded border cursor-pointer object-cover ${
                    currentImage === index
                      ? "border-teal-500 border-2"
                      : "border-gray-300"
                  }`}
                />
              ))}

            </div>

          </div>

          {/* Product Info */}

          <div className="space-y-5">

            <h1 className="text-4xl font-bold">
              {product.title}
            </h1>

            <p className="text-gray-600">
              Brand :
              <span className="font-semibold ml-2">
                {product.brand}
              </span>
            </p>

            <p className="text-gray-600">
              Category :
              <span className="font-semibold ml-2 capitalize">
                {product.category}
              </span>
            </p>

            <div className="flex items-center gap-4">
              <span className="bg-green-500 text-white px-3 py-1 rounded">
                ⭐ {product.rating}
              </span>

              <span className="text-sm text-gray-500">
                {product.stock} Items Left
              </span>
            </div>

            <div className="flex items-center gap-4">

              <span className="text-4xl font-bold text-teal-600">
                ₹{product.price}
              </span>

              <span className="bg-red-100 text-blue-600 px-3 py-1 rounded-full">
                {product.discountPercentage}% OFF
              </span>

            </div>

            <p className="text-gray-700 leading-7">
              {product.description}
            </p>

            {/* Buttons */}

            <div className="grid sm:grid-cols-3 gap-4 pt-5">

              <button className="flex justify-center items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg">
                <FaHeart />
                Wishlist
              </button>

             <button
  onClick={() => {

    try {
      dispatch(addToCart(product));
    } catch (error) {
      console.error("DISPATCH ERROR:", error);
    }
  }}
  className="flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg"
>
  <FaShoppingCart />
  Add to Cart
</button>

              <button className="flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg">
                <FaBolt />
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ProductDetails;