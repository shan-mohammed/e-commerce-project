import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

const [loggedInUser, setLoggedInUser] = useState(() => {
try {
return JSON.parse(localStorage.getItem("loggedInUser"));
} catch {
return null;
}
});

// Login
const login = (user) => {
localStorage.setItem("loggedInUser", JSON.stringify(user));
setLoggedInUser(user);
};

// Logout
const logout = () => {
localStorage.removeItem("loggedInUser");
setLoggedInUser(null);
};

return (
<AuthContext.Provider
value={{ loggedInUser, login, logout }}
>
{children}
</AuthContext.Provider>
);
};

// Custom hook
export const useAuth = () => {
return useContext(AuthContext);
};
