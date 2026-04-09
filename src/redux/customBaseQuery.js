import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/** Read ACCESS_TOKEN cookie */
const getAccessToken = () => {
  const raw = Cookies.get("ACCESS_TOKEN");
  return raw ? raw.replace(/"/g, "") : null;
};

/** Read REFRESH_TOKEN cookie */
const getRefreshToken = () => {
  const raw = Cookies.get("REFRESH_TOKEN");
  return raw ? raw.replace(/"/g, "") : null;
};

/** Clear cookies on logout */
const clearAuthCookies = () => {
  Cookies.remove("ACCESS_TOKEN");
  Cookies.remove("REFRESH_TOKEN");
  Cookies.remove("USER");
  Cookies.remove("TOKEN");
};

/** Persist a new access token after a silent refresh */
const saveNewAccessToken = (token) => {
  Cookies.set("ACCESS_TOKEN", token, { expires: 1, sameSite: "strict" });
};

// Base query
const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "application/json");
    return headers;
  },
});

// Silent token refresh — called when API returns 401
let isRefreshing = false;

const silentRefresh = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${BASE_URL}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return null;

    const json = await res.json();
    const newToken = json?.accessToken ?? json?.token ?? null;
    return newToken;
  } catch {
    return null;
  }
};

// Custom base query with auto-refresh on 401
export const customBaseQuery = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const { status } = result.error;

    // ------- 401: try silent refresh then retry -------
    if (status === 401 && !isRefreshing) {
      isRefreshing = true;

      const newAccessToken = await silentRefresh();
      isRefreshing = false;

      if (newAccessToken) {
        saveNewAccessToken(newAccessToken);
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
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
