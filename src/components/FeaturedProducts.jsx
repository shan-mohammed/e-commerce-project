import { useEffect, useState } from "react";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=4")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-14 px-6">
      <h2 className="text-3xl font-bold mb-8">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow hover:shadow-xl transition"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-48 w-full object-contain"
            />

            <h3 className="font-semibold mt-4">
              {product.title}
            </h3>

            <p className="text-teal-600 font-bold">
              ₹{product.price}
            </p>

            <button className="mt-4 w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;