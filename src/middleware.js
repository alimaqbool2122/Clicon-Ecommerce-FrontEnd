import { NextResponse } from "next/server";
import ROUTES from "./constants/routes";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Get auth token from cookies
  const authToken = req.cookies.get("authToken")?.value;

  // Protected routes that require authentication
  const protectedRoutes = [
    // Dashboard routes - all dashboard pages should be protected
    // ROUTES.DASHBOARD,
    // ROUTES.ORDER_HISTORY,
    // ROUTES.TRACK_ORDER,
    // ROUTES.SHOPING_CARD,
    // ROUTES.CHECK_OUT,
    // ROUTES.WISHLIST,
    // ROUTES.CHECK_OUT_SUCCESS,
    // ROUTES.CHECK_OUT_FAILED,
    // ROUTES.COMPARE,
    // ROUTES.PROFILE,
    // ROUTES.PROFILE_SETTINGS,
    // ROUTES.BROWSING_HISTORY,
    // ROUTES.CARDS_ADDRESS,
    // ROUTES.PROFILE_SETTINGS,
  ];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // If it's a protected route and user is not authenticated, redirect to login
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL("/login", req.url);
    // loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow all other routes to pass through
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
