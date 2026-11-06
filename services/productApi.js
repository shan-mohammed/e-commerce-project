import {apiClient} from "./axiosConfig";

export const getProducts = async()=>{
    const response = await apiClient.get("/api/products")
    return response.data.data;
};
  
export const getProductById = async(id)=>{
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data.data
};

// create product
export const createProduct = async(productData)=>{
    const response = await apiClient.post("/api/products",productData);
    return response.data;

};

// update product
export const updateProduct = async(_id,productData)=>{
    const response = await apiClient.put(`/api/products/${_id}`,productData);
    return response.data;
};

// Delete Product
export const deleteProduct = async(_id)=>{
    const response = await apiClient.delete(`/api/products/${_id}`);
    return response.data
}