import { apiClient } from "./axiosConfig";

export const registerUser = async (userData) => {
  const response = await apiClient.post(
    "/api/auth/register",
    userData
  );

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await apiClient.post(
    "/api/auth/login",
    userData
  );

  return response.data;
};
