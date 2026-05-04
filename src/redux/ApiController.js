import { authApi } from "./services/auth/authApiSlice";
import { bannerApi } from "./services/bannerSlice";

export const apiReducer = {
  // REACT QUERY REDUCER
  [authApi.reducerPath]: authApi.reducer,
  [bannerApi.reducerPath]: bannerApi.reducer,
};

export const apiMiddleware = [authApi.middleware, bannerApi.middleware];
