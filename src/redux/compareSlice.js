import { createSlice } from "@reduxjs/toolkit";

// Get logged-in user
const getLoggedInUser = () => {
  const user = localStorage.getItem("loggedInUser");

  return user ? JSON.parse(user) : null;
};

// Get user ID
const getUserId = () => {
  const user = getLoggedInUser();

  return user?._id || user?.id || null;
};

// Get product ID
const getProductId = (product) => {
  return product?._id || product?.id;
};

// Get compare products for current user
const getUserCompare = () => {
  const user = getLoggedInUser();

  if (!user) {
    return [];
  }

  const userId = user._id || user.id;

  const compares = JSON.parse(
    localStorage.getItem("userCompares") || "{}"
  );

  return compares[userId] || [];
};

// Save compare products for current user
const saveUserCompare = (items) => {
  const userId = getUserId();

  if (!userId) {
    return;
  }

  const compares = JSON.parse(
    localStorage.getItem("userCompares") || "{}"
  );

  compares[userId] = items;

  localStorage.setItem(
    "userCompares",
    JSON.stringify(compares)
  );
};

const initialState = {
  items: getUserCompare(),
};

const compareSlice = createSlice({
  name: "compare",

  initialState,

  reducers: {
    // Load user's compare products after login
    setCompare: (state, action) => {
      state.items = action.payload || [];
      saveUserCompare(state.items);
    },

    // Clear Redux state during logout
    resetCompareState: (state) => {
      state.items = [];
    },

    // Add product to compare
    addToCompare: (state, action) => {
      const product = action.payload;
      const productId = getProductId(product);

      if (!productId) {
        return;
      }

      // Check whether product already exists
      const exists = state.items.some(
        (item) => getProductId(item) === productId
      );

      if (exists) {
        return;
      }

      // Maximum 3 products
      if (state.items.length >= 3) {
        return;
      }

      state.items.push(product);

      saveUserCompare(state.items);
    },

    // Remove product from compare
    removeFromCompare: (state, action) => {
      state.items = state.items.filter(
        (item) => getProductId(item) !== action.payload
      );

      saveUserCompare(state.items);
    },

    // Clear all compare products
    clearCompare: (state) => {
      state.items = [];

      saveUserCompare(state.items);
    },
  },
});

export const {
  setCompare,
  resetCompareState,
  addToCompare,
  removeFromCompare,
  clearCompare,
} = compareSlice.actions;

export default compareSlice.reducer;