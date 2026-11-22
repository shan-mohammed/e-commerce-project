import { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../../services/userApi";

import { useAuth } from "../context/AuthContext";

const ManageUsers = () => {
  const { loggedInUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllUsers();

      setUsers(data.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update user role
  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? { ...user, role: newRole }
            : user
        )
      );

      alert("User role updated successfully!");
    } catch (error) {
      console.error("Role update error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to update user role"
      );
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(userId);

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );

      alert("User deleted successfully!");
    } catch (error) {
      console.error("Delete user error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to delete user"
      );
    }
  };

  // Search users
  const filteredUsers = users.filter((user) => {
    const searchValue = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <p className="text-lg font-medium text-gray-600">
          Loading users...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">

      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            User Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage registered users and their roles.
          </p>
        </div>

        <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-lg">
          <p className="text-sm">Total Users</p>

          <h2 className="text-2xl font-bold">
            {users.length}
          </h2>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
          {error}
          <button
            onClick={fetchUsers}
            className="ml-3 underline font-semibold"
          >
            Retry
          </button>
        </div>
      )}

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full min-w-[750px] text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Joined Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => {
                const isCurrentUser =
                  String(user._id) ===
                  String(loggedInUser?._id || loggedInUser?.id);

                return (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4">{index + 1}</td>

                    <td className="p-4 font-medium">
                      {user.name}
                      {isCurrentUser && (
                        <span className="ml-2 text-xs text-blue-600">
                          (You)
                        </span>
                      )}
                    </td>

                    <td className="p-4">{user.email}</td>

                    <td className="p-4">
                      <select
                        value={user.role}
                        disabled={isCurrentUser}
                        onChange={(e) =>
                          handleRoleChange(
                            user._id,
                            e.target.value
                          )
                        }
                        className="border rounded-md px-2 py-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td className="p-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleDelete(user._id)}
                        disabled={isCurrentUser}
                        className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-8 text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ManageUsers;