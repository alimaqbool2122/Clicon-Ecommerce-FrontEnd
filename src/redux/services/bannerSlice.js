import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "@/redux/customBaseQuery";

export const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Banner"],
  endpoints: (builder) => ({
    // Get all banners
    getAllBanners: builder.query({
      query: () => ({
        url: "/get-banners",
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),
  }),
});

export const { useGetAllBannersQuery } = bannerApi;
