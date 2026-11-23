import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getProducts} from "../../services/productApi"


const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]= useState("");
  
  const navigate =useNavigate()

 
 
  useEffect(() => {
   const fetchFeaturedProducts =async () =>{
    try {
      const response = await getProducts();

      // handle different API responce structures
      const productList = Array.isArray(response) ? response 
      :response.products || response.data?.products ||
       response.data || []
       setProducts(productList.slice(0,4))
    } catch (error) {
      console.error("Failed to fetch featured products:",error);
        setError("Unable to load featured products.")
      }finally {
        setLoading(false)
      }
   };

   fetchFeaturedProducts()
  }, []);

 if(loading){
  return (
    <saction className="max-w-7xl mx-auto py-14 px-6 ">
   <p className="text-center">Loading featured products...</p>
    </saction>
  )
 }
 if(error){
    return (
      <section className="max-w-7xl mx-auto py-14 px-6">
        <p className="text-center text-red-500">{error}</p>
      </section>
    );
  }
  return (
    <section className="max-w-7xl mx-auto py-14 px-6">
      <h2 className="text-3xl font-bold mb-8">
        Featured Products
      </h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) =>(
        <div
        key={product._id} className="bborder rounded-xl p-4 shadow hover:shadow-xl transition"
        >
          <img src={product.imageUrl}
          alt={product.title}
          className="h-48 w-full object-contain"/>

          <h3 className="font-semibold mt-4">
            {product.title}
          </h3>

          <p className="text-teal-600 font-bold">
            ₹{product.price} 
            </p>

            <button onClick={()=>navigate(`/products/${product._id}`)}
              className="mt-4 w-full bg-teal-500 text-white py-2 rounded hover::bg-teal-600">
                View Details
              </button>
        </div>
      ))}
    </div>
    </section>
  )
 
 }

export default FeaturedProducts;