import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadCart } from "../redux/cartSlice";
import { setWishlist } from "../redux/wishListSlice";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get all registered users
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
      setError(
        "No account found. Please create an account first."
      );
      return;
    }

    // Find matching user
    const user = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    // Save currently logged-in user
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
      })
    );
    dispatch(loadCart(user.id));

// Load this user's wishlist
dispatch(
  setWishlist(
    JSON.parse(
      localStorage.getItem("userWishlists") || "{}"
    )[user.id] || []
  )
);

    // Login successful
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">

        {/* Logo */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-extrabold text-teal-500">
            WE<span className="text-gray-500">SHOP</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back!
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-5 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Login */}
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?

          <Link
            to="/signup"
            className="text-teal-500 font-semibold ml-1"
          >
            Create Account
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;