import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/** Read TOKEN cookie */
const getToken = () => {
  const raw = Cookies.get("TOKEN");
  return raw ? raw.replace(/"/g, "") : null;
};

/** Clear cookies on logout */
const clearAuthCookies = () => {
  Cookies.remove("TOKEN", { path: "/" });
  Cookies.remove("USER", { path: "/" });
};

/** Persist a token */
const saveToken = (token) => {
  Cookies.set("TOKEN", token, { expires: 7, sameSite: "strict", path: "/" });
};

// Base query
const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "application/json");
    return headers;
  },
});
// Custom base query
export const customBaseQuery = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const { status } = result.error;

    // ------- 401: Unauthorized (expired or invalid token) -------
    if (status === 401) {
      const isLoginRequest =
        args.url?.includes("/login") ||
        args?.includes("/login") ||
        args.url?.includes("/signin") ||
        args?.includes("/signin");

      if (!isLoginRequest) {
        clearAuthCookies();
        toast.error("Session expired. Please sign in again.");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return {
          error: {
            status: 401,
            data: { message: "Session expired. Please sign in again." },
          },
        };
      }
      // For login requests, we just let the error pass through so the login page can handle it
    }

    // ------- 403: Forbidden -------
    if (result.error?.status === 403) {
      toast.error("Access denied. You don't have permission to do this.");
      return {
        error: {
          status: 403,
          data: { message: "Forbidden — insufficient permissions." },
        },
      };
    }

    if (result.error?.status === 500) {
      toast.error("Server error. Please try again later.");
    }

    if (result.error?.status === "FETCH_ERROR") {
      toast.error("Network error. Check your connection.");
    }
  }

  return result;
};
