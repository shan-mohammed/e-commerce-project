import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaBolt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { getProductById } from "../../services/productApi";


const ProductDetails = () => {

  const { id } = useParams();
  const dispatch= useDispatch();

  const [product, setProduct] = useState(null);
  const [loading ,setLoading] =useState(true);
  const [error ,setError] =useState("");

  useEffect(() => {
    const fetchProduct = async()=>{
  try {
      setLoading(true);
      setError("");

      const data =await getProductById(id);
      setProduct(data);

    } catch (error) {
      console.error("Product fetch error:",error);
      setError("Unable to load productdetails");
    } finally{
      setLoading(false);
    }
    };
    fetchProduct()
  }, [id]);

  if(loading) {
    return (
        <div className="flex justify-center items-center h-screen text-2xl font-semibold ">
           Loading...
        </div>
    )
  }
  if(error || !product){
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold text-red-500">
        {error || "Product not found"}
      </div>
    )
  }

  // if (!product) {
  //   return (
  //     <div className="flex justify-center items-center h-screen text-2xl font-semibold">
  //       Loading...
  //     </div>
  //   );
  // }

  // const nextImage = () => {
  //   setCurrentImage((prev) =>
  //     prev === product.images.length - 1 ? 0 : prev + 1
  //   );
  // };

  // const prevImage = () => {
  //   setCurrentImage((prev) =>
  //     prev === 0 ? product.images.length - 1 : prev - 1
  //   );
  // };

  return (
     <section className="bg-gray-100 min-h-screen py-10 px-4">
       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
         <div className="grid lg:grid-cols-2 gap-10">
          {/* Product Image */}
          <div> 
            <div className="relative bg-gray-100 rounded-lg flex justify-center items-center h-420px"> 
              <img src={product.imageUrl || "/placeholder.png"}
               alt={product.title} className="max-h-full max-w-full object-contain" /> 
               </div> 
               </div>
                {/* Product Information */}
                 <div className="space-y-5"> 
                  <h1 className="text-4xl font-bold">
                     {product.title} 
                     </h1>
                      <p className="text-gray-600"> Brand:
                         <span className="font-semibold ml-2"> 
                          {product.brand || "Other"} 
                          </span>
                           </p>
                            <p className="text-gray-600"> Category:
                               <span className="font-semibold ml-2 capitalize"> 
                                {product.category} 
                                </span> 
                                </p> 
                                <div className="flex items-center gap-4">
                                   <span className="bg-green-500 text-white px-3 py-1 rounded"> 
                                    ⭐ {product.rating}
                                     </span>
                                      </div> 
                                      <div className="flex items-center gap-4">
                                         <span className="text-4xl font-bold text-teal-600"> 
                                          ₹{product.price}
                                           </span> 
                                           </div> {product.description && ( <p className="text-gray-700 leading-7"> 
                                            {product.description} </p> )}
                                             {/* Buttons */} 
                                             <div className="grid sm:grid-cols-3 gap-4 pt-5"> 
                                              <button className="flex justify-center items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg" >
                                                 <FaHeart /> Wishlist </button> 
                                                 <button onClick={() =>
                                                  dispatch(addToCart(product))} className="flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg" > 
             <FaShoppingCart /> Add to Cart </button> 
             <button className="flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg" > 
              <FaBolt /> Buy Now </button> 
             </div> 
             </div> 
           </div> 
           </div>
   </section> 
   );
};

export default ProductDetails;