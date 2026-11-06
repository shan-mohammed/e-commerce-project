import { apiClient } from "./axiosConfig";

export const getRecommendations = async (productId)=>{
    const response =await apiClient.get(
        `/api/recommendations/${productId}`
    )

    return response.data.data;
}