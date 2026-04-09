import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./services/cartSlice";
import wishlistReducer from "./services/wishlistSlice";
import compareReducer from "./services/compareSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiReducer, apiMiddleware } from "./ApiController";

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  compare: compareReducer,
  ...apiReducer,
});

const persistConfig = {
  key: "clicon-root",
  storage,
  whitelist: ["cart", "wishlist", "compare"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(...apiMiddleware),
});

export const persistor = persistStore(store);
