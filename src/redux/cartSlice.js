import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cartItems")
const initialState = {
  items:savedCart ? JSON.parse(savedCart) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      )
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
        localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    increaseQty: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {item.quantity++;}
        localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity--;
      }
        localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },
    clearCart: (state) => {
      state.items = [];

      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
} = cartSlice.actions;

export default cartSlice.reducer;