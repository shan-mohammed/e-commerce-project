import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiClient } from "../../services/axiosConfig";

const RecommendedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiClient.get("/api/recommendations");

        if (response.data.success) {
          setProducts(response.data.data || []);
        } else {
          setError("Unable to load recommendations.");
        }
      } catch (err) {
        console.error("Recommendation fetching error:", err);

        setError(
          err.response?.data?.message ||
          "Failed to load recommended products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <section className="py-10 text-center">
        <p className="text-gray-600">
          Finding products you may like...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 text-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="px-4 md:px-8 lg:px-12 py-10">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Recommended For You
        </h2>

        <p className="text-gray-500 mt-2">
          Products selected based on your interests
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <Link to={`/products/${product._id}`}>
              <div className="h-40 md:h-52 bg-gray-100 flex items-center justify-center p-3">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 line-clamp-2 min-h-12">
                  {product.title}
                </h3>

                <p className="text-lg font-bold text-orange-600 mt-2">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>

                <p className="text-sm text-yellow-600 mt-1">
                  ★ {product.rating || "No rating"}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {product.brand}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;