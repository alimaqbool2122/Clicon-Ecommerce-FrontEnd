import { authApi } from "./services/auth/authApiSlice";

export const apiReducer = {
  // REACT QUERY REDUCER
  [authApi.reducerPath]: authApi.reducer,
};

export const apiMiddleware = [authApi.middleware];
