import { apiClient } from "./axiosConfig";


// place new order 
export const createOrder = async(orderData)=>{
    const response = await apiClient.post("/api/orders",orderData);
    return response.data;    

}
// get orders belonging to loggedin customer
export const getMyOrders =async()=>{
    const response= await apiClient.get("/api/orders/my-orders");
    return response.data;
}