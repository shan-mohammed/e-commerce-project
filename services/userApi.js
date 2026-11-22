import {apiClient} from "./axiosConfig";

// Get all users
export const getAllUsers = async () => {
  const response = await apiClient.get("/api/users");
  return response.data;
};

// Update user role
export const updateUserRole = async (userId, role) => {
  const response = await apiClient.put(
    `/api/users/${userId}/role`,
    { role }
  );

  return response.data;
};

// Delete user
export const deleteUser = async (userId) => {
  const response = await apiClient.delete(
    `/api/users/${userId}`
  );

  return response.data;
};