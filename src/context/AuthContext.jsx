import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

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
