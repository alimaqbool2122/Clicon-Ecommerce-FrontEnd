import { createSlice } from "@reduxjs/toolkit";

const MAX_COMPARE_ITEMS = 4;

const initialState = {
  items: [],
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    toggleCompareItem: (state, action) => {
      const item = action.payload;
      const idx = state.items.findIndex((i) => i.id === item.id);
      if (idx >= 0) {
        state.items.splice(idx, 1);
      } else if (state.items.length < MAX_COMPARE_ITEMS) {
        state.items.push(item);
      }
    },
    removeFromCompare: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
    clearCompare: (state) => {
      state.items = [];
    },
  },
});

export const { toggleCompareItem, removeFromCompare, clearCompare } =
  compareSlice.actions;
export default compareSlice.reducer;
export { MAX_COMPARE_ITEMS };
