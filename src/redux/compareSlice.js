import { createSlice } from "@reduxjs/toolkit";

// Get logged-in user
const getLoggedInUser = () => {
  const user = localStorage.getItem("loggedInUser");

  return user ? JSON.parse(user) : null;
};

// Get compare products for current user
const getUserCompare = () => {
  const user = getLoggedInUser();

  if (!user) {
    return [];
  }

  const compares = JSON.parse(
    localStorage.getItem("userCompares") || "{}"
  );

  return compares[user.id] || [];
};

// Save compare products for current user
const saveUserCompare = (items) => {
  const user = getLoggedInUser();

  if (!user) {
    return;
  }

  const compares = JSON.parse(
    localStorage.getItem("userCompares") || "{}"
  );

  compares[user.id] = items;

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
      state.items = action.payload;
    },

    // Clear Redux state during logout
    resetCompareState: (state) => {
      state.items = [];
    },

    // Add product to compare
    addToCompare: (state, action) => {
      const product = action.payload;

      const exists = state.items.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return;
      }

      // Limit comparison to 3 products
      if (state.items.length >= 3) {
        return;
      }

      state.items.push(product);

      saveUserCompare(state.items);
    },

    // Remove product from compare
    removeFromCompare: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
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