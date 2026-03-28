import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlistItem: (state, action) => {
      const item = action.payload;
      const idx = state.items.findIndex((i) => i.id === item.id);
      if (idx >= 0) {
        state.items.splice(idx, 1);
      } else {
        state.items.push(item);
      }
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { toggleWishlistItem, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
