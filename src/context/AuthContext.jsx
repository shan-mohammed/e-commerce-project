import { createContext, useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCompareState } from "../redux/compareSlice";
import { resetWishlistState } from "../redux/wishListSlice";
import { resetCartState } from "../redux/cartSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const dispatch = useDispatch();
  // Initialize user from localStorage
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Login
  const login = (userData) => {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));

    setLoggedInUser(userData);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("loggedInUser");

    setLoggedInUser(null);
    dispatch(resetCompareState())
    dispatch(resetWishlistState())
    dispatch(resetCartState())
  };

  // Register
  const register = (userData) => {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));

    setLoggedInUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        login,
        logout,
        register,
        setLoggedInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
