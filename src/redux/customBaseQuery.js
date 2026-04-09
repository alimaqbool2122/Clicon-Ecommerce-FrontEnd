import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get("TOKEN");
    if (token) {
      headers.set("Authorization", `Bearer ${token.replace(/"/g, "")}`);
    }
    headers.set("Accept", "application/json");
    return headers;
  },
});

export const customBaseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const { status } = result.error;

    if (status === 401) {
      // ← Clear the invalid token so middleware also blocks access
      Cookies.remove("TOKEN");

      // Redirect to login (works in browser context)
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }

      return {
        error: {
          status: 401,
          data: { message: "Your session has expired. Please login again." },
        },
      };
    } else if (status === 500) {
      toast.error("Server Error (500)");
    } else {
      toast.error("API Error");
    }
  }

  return result;
};
