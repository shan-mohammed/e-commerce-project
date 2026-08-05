import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Products() {
    const navigate = useNavigate()
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=200")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Our Products
        </h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="h-52 flex items-center justify-center bg-gray-50 p-4">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                    onClick={() => navigate(`/products/${product.id}`)}
                  className="h-full w-full object-contain cursor-pointer"
                />
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

                <button className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}

export default Products;