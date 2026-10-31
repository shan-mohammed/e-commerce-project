import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadCart } from "../redux/cartSlice";
import { setWishlist } from "../redux/wishListSlice";
import { loginUser } from "../../services/authApi";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      // Expected backend response:

      const user = response.data.user;

      if (!user || !user._id) {
        throw new Error("Invalid user information received");
      }

      // Save logged-in user
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      );

      // Load user's cart
      dispatch(loadCart(user._id));

      // Load user's wishlist
      const allWishlists = JSON.parse(
        localStorage.getItem("userWishlists") || "{}"
      );

      dispatch(setWishlist(allWishlists[user._id] || []));

      navigate("/profile");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-teal-500">
            WE<span className="text-gray-500">SHOP</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back!
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-5 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

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
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

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
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
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
