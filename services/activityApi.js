import {apiClient} from "./axiosConfig";

export const trackActivity = async (productId, action) => {
  const response = await apiClient.post("/api/activity/track", {
    productId,
    action,
  });

  return response.data;
};