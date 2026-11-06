import { createSlice } from "@reduxjs/toolkit";

// Get logged-in user
const getLoggedInUser = () => {
  try {
    const user = localStorage.getItem("loggedInUser");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error reading logged-in user:", error);
    return null;
  }
};

// Get current user's ID
const getUserId = () => {
  const user = getLoggedInUser();
  return user?._id || user?.id || null;
};

// Get wishlist for current user
const getUserWishlist = () => {
  const userId = getUserId();

  if (!userId) return [];

  try {
    const wishlists = JSON.parse(
      localStorage.getItem("userWishlists") || "{}"
    );

    return wishlists[userId] || [];
  } catch (error) {
    console.error("Error loading wishlist:", error);
    return [];
  }
};

// Save wishlist for current user
const saveUserWishlist = (items) => {
  const userId = getUserId();

  if (!userId) return;

  try {
    const wishlists = JSON.parse(
      localStorage.getItem("userWishlists") || "{}"
    );

    wishlists[userId] = items;

    localStorage.setItem(
      "userWishlists",
      JSON.stringify(wishlists)
    );
  } catch (error) {
    console.error("Error saving wishlist:", error);
  }
};

const initialState = {
  items: getUserWishlist(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload;
      saveUserWishlist(state.items);
    },

    resetWishlistState: (state) => {
      state.items = [];
    },

    // Add product
    addToWishlist: (state, action) => {
      const product = action.payload;
      const productId = product._id || product.id;

      const exists = state.items.some(
        (item) => (item._id || item.id) === productId
      );

      if (!exists) {
        state.items.push(product);
        saveUserWishlist(state.items);
      }
    },

    // Remove product
    removeFromWishlist: (state, action) => {
      const productId = action.payload;

      state.items = state.items.filter(
        (item) => (item._id || item.id) !== productId
      );

      saveUserWishlist(state.items);
    },

    // Clear current user's wishlist
    clearWishlist: (state) => {
      state.items = [];
      saveUserWishlist(state.items);
    },
  },
});

export const {
  setWishlist,
  resetWishlistState,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;