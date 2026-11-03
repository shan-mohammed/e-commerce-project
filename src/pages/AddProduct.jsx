import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {createProduct} from "../../services/productApi"


const AddProduct =()=>{
    const navigate = useNavigate();
    const[formData, setFormData ] =useState({
        title:"",
        price:"",
        category:"",
        brand:"",
        rating:"",
    });
    const [image ,setImage] = useState(null);
    const [loading ,setloading]=useState(false);

    const handleChange= (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        })
    }

    const handleSubmit =async(e)=>{
        e.preventDefault();

        if(!image){
            alert("Please enter a product image ")
            return;
        }
        try {
            setloading(true);

            const data =new FormData();

            data.append("title",formData.title);
             data.append("price",formData.price);
              data.append("category",formData.category);
               data.append("brand",formData.brand);
                data.append("rating",formData.rating || 0);
                 data.append("image",image);

                 const response = await createProduct(data)

                 alert (response.message || "Product created successfully")

                 navigate("/products")
        } catch (error) {
            console.error("Product creation error :",error)
            alert(error.response?.data?.message || "Failed to create product")
        }finally{
            setloading(false)
        }
    }
    return(
        <div className="min-h-screen bg-gray-100 py-10 px-4">

            <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Add new product
                </h2>
              
               <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Product Name"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="rating"
            placeholder="Rating (0-5)"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            className="w-full border p-3 rounded-lg"
          />

          <div>
            <label className="block mb-2 font-medium">
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Product preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>

        </form>
            </div>

        </div>
    )
} 

export default  AddProduct