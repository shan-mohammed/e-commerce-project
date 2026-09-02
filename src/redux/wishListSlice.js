import { createSlice } from "@reduxjs/toolkit";

// Get logged-in user
const getLoggedInUser = () => {
  const user = localStorage.getItem("loggedInUser");

  return user ? JSON.parse(user) : null;
};

// Get wishlist for current user
const getUserWishlist = () => {
  const user = getLoggedInUser();

  if (!user) {
    return [];
  }

  const wishlists = JSON.parse(
    localStorage.getItem("userWishlists") || "{}"
  );

  return wishlists[user.id] || [];
};

// Save wishlist for current user
const saveUserWishlist = (items) => {
  const user = getLoggedInUser();

  if (!user) {
    return;
  }

  const wishlists = JSON.parse(
    localStorage.getItem("userWishlists") || "{}"
  );

  wishlists[user.id] = items;

  localStorage.setItem(
    "userWishlists",
    JSON.stringify(wishlists)
  );
};

const initialState = {
  items: getUserWishlist(),
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;

      const exists = state.items.some(
        (item) => item.id === product.id
      );

      if (!exists) {
        state.items.push(product);
        saveUserWishlist(state.items);
      }
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      saveUserWishlist(state.items);
    },

    clearWishlist: (state) => {
      state.items = [];

      saveUserWishlist(state.items);
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;