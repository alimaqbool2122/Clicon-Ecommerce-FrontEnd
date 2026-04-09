"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

const ACCESS_TOKEN_OPTIONS = { expires: 1, sameSite: "strict" };
const REFRESH_TOKEN_OPTIONS = { expires: 7, sameSite: "strict" };
const USER_OPTIONS = { expires: 7, sameSite: "strict" };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate user from cookie on mount
  useEffect(() => {
    const storedUser = Cookies.get("USER");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        Cookies.remove("USER");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (response) => {
    if (!response) return;

    // --- tokens ---
    const accessToken = response.accessToken ?? response.token ?? null;
    const refreshToken = response.refreshToken ?? null;

    // --- user data ---
    const userData = response.data ?? response.user ?? null;

    if (!accessToken || !userData) {
      console.warn(
        "[AuthProvider] login() – missing accessToken or user data.",
        response,
      );
      return;
    }

    // Persist access token
    Cookies.set("ACCESS_TOKEN", accessToken, ACCESS_TOKEN_OPTIONS);

    // Persist refresh token
    if (refreshToken) {
      Cookies.set("REFRESH_TOKEN", refreshToken, REFRESH_TOKEN_OPTIONS);
    }

    // Persist user profile
    Cookies.set("USER", JSON.stringify(userData), USER_OPTIONS);

    setUser(userData);
  };

  // Update the access token
  const updateAccessToken = (newAccessToken) => {
    if (!newAccessToken) return;
    Cookies.set("ACCESS_TOKEN", newAccessToken, ACCESS_TOKEN_OPTIONS);
  };

  /** Clear every auth cookie and reset React state */
  const logout = () => {
    Cookies.remove("ACCESS_TOKEN");
    Cookies.remove("REFRESH_TOKEN");
    Cookies.remove("USER");
    Cookies.remove("TOKEN");
    setUser(null);
  };

  const getToken = () => Cookies.get("ACCESS_TOKEN") ?? null;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, getToken, updateAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
