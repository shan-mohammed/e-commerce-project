import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishListReducer from "./wishListSlice";
import compareReducer from "./compareSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist : wishListReducer,
    compare :compareReducer
  },
});