import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (i) =>
          i.id === item.id &&
          i.selectedSize === item.selectedSize &&
          i.selectedColor === item.selectedColor,
      );

      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { id, selectedSize, selectedColor } = action.payload;
      state.cartItems = state.cartItems.filter(
        (i) =>
          !(
            i.id === id &&
            i.selectedSize === selectedSize &&
            i.selectedColor === selectedColor
          ),
      );
    },
    updateQuantity: (state, action) => {
      const { id, selectedSize, selectedColor, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (i) =>
          i.id === id &&
          i.selectedSize === selectedSize &&
          i.selectedColor === selectedColor,
      );
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
