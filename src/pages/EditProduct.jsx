import { useEffect, useState } from "react";
import {
useNavigate,
useParams,
useOutletContext,
} from "react-router-dom";

import {
getProductById,
updateProduct,
} from "../../services/productApi";

const EditProduct = () => {
const { id } = useParams();
const navigate = useNavigate();

const { refreshProducts } = useOutletContext();

const [formData, setFormData] = useState({
title: "",
price: "",
category: "",
brand: "",
rating: "",
});

const [image, setImage] = useState(null);
const [currentImage, setCurrentImage] = useState("");
const [loading, setLoading] = useState(true);
const [submitting, setSubmitting] = useState(false);

// Fetch existing product
useEffect(() => {
const fetchProduct = async () => {
try {
const product = await getProductById(id);

    setFormData({
      title: product.title || "",
      price: product.price ?? "",
      category: product.category || "",
      brand: product.brand || "",
      rating: product.rating ?? 0,
    });

    setCurrentImage(product.imageUrl || "");

  } catch (error) {
    console.error("Fetch product error:", error);

    alert("Failed to load product");

    navigate("/admin/products");

  } finally {
    setLoading(false);
  }
};

fetchProduct();

}, [id, navigate]);

// Handle input changes
const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

// Handle image selection
const handleImageChange = (e) => {
setImage(e.target.files[0] || null);
};

// Submit updated product
const handleSubmit = async (e) => {
e.preventDefault();

try {
  setSubmitting(true);

  const data = new FormData();

  data.append("title", formData.title);
  data.append("price", formData.price);
  data.append("category", formData.category);
  data.append("brand", formData.brand);
  data.append("rating", formData.rating);

  // Only send image if a new image is selected
  if (image) {
    data.append("image", image);
  }

  const response = await updateProduct(id, data);

  await refreshProducts();

  alert(response.message || "Product updated successfully");

  navigate("/admin/products");

} catch (error) {
  console.error("Update product error:", error);

  alert(
    error.response?.data?.message ||
    "Failed to update product"
  );

} finally {
  setSubmitting(false);
}

};

if (loading) {
return ( <div className="text-center p-10">
Loading product... </div>
);
}

return ( <div className="min-h-screen bg-gray-100 p-4 md:p-8">

  <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">

    <h1 className="text-2xl md:text-3xl font-bold mb-2">
      Edit Product
    </h1>

    <p className="text-gray-500 mb-6">
      Update your product information.
    </p>

    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Product title */}
      <div>
        <label className="block font-medium mb-2">
          Product Name
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block font-medium mb-2">
          Price
        </label>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          required
          className="w-full border p-3 rounded-lg"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium mb-2">
          Category
        </label>

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />
      </div>

      {/* Brand */}
      <div>
        <label className="block font-medium mb-2">
          Brand
        </label>

        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />
      </div>

      {/* Rating */}
      <div>
        <label className="block font-medium mb-2">
          Rating
        </label>

        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="0"
          max="5"
          step="0.1"
          className="w-full border p-3 rounded-lg"
        />
      </div>

      {/* Existing image */}
      <div>
        <label className="block font-medium mb-2">
          Current Product Image
        </label>

        {currentImage && (
          <img
            src={currentImage}
            alt={formData.title}
            className="w-32 h-32 object-cover rounded-lg mb-3"
          />
        )}

        <label className="block font-medium mb-2">
          Choose New Image (Optional)
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-3 rounded-lg"
        />

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="New preview"
            className="w-32 h-32 object-cover rounded-lg mt-3"
          />
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">

        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Updating..." : "Update Product"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>

      </div>

    </form>

  </div>

</div>

);
};

export default EditProduct;
