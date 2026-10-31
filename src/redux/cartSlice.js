import { createSlice } from "@reduxjs/toolkit";

// Get currently logged-in user
const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem("loggedInUser"));
};

// Create a unique cart key for each user
const getCartKey = () => {
  const user = getLoggedInUser();

  if (!user) {
    return null;
  }
// support mongoDB _id
const userId =user._id || user.id

  return `cartItems_${userId}`;
};

// Load current user's cart
const getInitialCart = () => {
  const cartKey = getCartKey();

  if (!cartKey) {
    return [];
  }

  const savedCart = localStorage.getItem(cartKey);

  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = {
  items: getInitialCart(),
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // Load cart when a user logs in
    loadCart: (state, action) => {
      const userId = action.payload;
      const cartKey = `cartItems_${userId}`;

      const savedCart = localStorage.getItem(cartKey);

      state.items = savedCart ? JSON.parse(savedCart) : [];
    },

    addToCart: (state, action) => {
      
      const product = action.payload;

      const productId = product._id || product.id;

      const existingItem = state.items.find(
        (item) => (item._id  || item.id )=== productId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }

      const cartKey = getCartKey();

      if (cartKey) {
        localStorage.setItem(
          cartKey,
          JSON.stringify(state.items)
        );
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => (item._id || item.id) !== action.payload
      );

      const cartKey = getCartKey();

      if (cartKey) {
        localStorage.setItem(
          cartKey,
          JSON.stringify(state.items)
        );
      }
    },

    increaseQty: (state, action) => {
      const item = state.items.find(
        (item) => (item._id || item.id) === action.payload
      );

      if (item) {
        item.quantity++;
      }

      const cartKey = getCartKey();

      if (cartKey) {
        localStorage.setItem(
          cartKey,
          JSON.stringify(state.items)
        );
      }
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(
        (item) => (item._id || item.id)=== action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity--;
      }

      const cartKey = getCartKey();

      if (cartKey) {
        localStorage.setItem(
          cartKey,
          JSON.stringify(state.items)
        );
      }
    },

resetCartState: (state) => {
  state.items = [];
},

    clearCart: (state) => {
      state.items = [];

      const cartKey = getCartKey();

      if (cartKey) {
        localStorage.removeItem(cartKey);
      }
    },
  },
});

export const {
  loadCart,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  resetCartState,
} = cartSlice.actions;

export default cartSlice.reducer;