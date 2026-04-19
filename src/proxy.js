import { NextResponse } from "next/server";
import ROUTES from "./constants/routes";

export function proxy(req) {
  const { pathname } = req.nextUrl;

  // TOKEN cookie
  const authToken = req.cookies.get("TOKEN")?.value;

  // 1. PROTECTED routes — require authentication
  const protectedRoutes = [
    ROUTES.DASHBOARD,
    ROUTES.ORDER_HISTORY,
    ROUTES.TRACK_ORDER,
    ROUTES.SHOPING_CARD,
    ROUTES.CHECK_OUT,
    ROUTES.WISHLIST,
    ROUTES.CHECK_OUT_SUCCESS,
    ROUTES.CHECK_OUT_FAILED,
    ROUTES.COMPARE,
    ROUTES.PROFILE,
    ROUTES.PROFILE_SETTINGS,
    ROUTES.BROWSING_HISTORY,
    ROUTES.CARDS_ADDRESS,
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Not logged in → redirect to login
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. AUTH-ONLY routes
  const authOnlyRoutes = [ROUTES.SIGIN, ROUTES.SIGNUP];

  const isAuthOnlyRoute = authOnlyRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Already logged in → redirect to home
  if (isAuthOnlyRoute && authToken) {
    return NextResponse.redirect(new URL(ROUTES.HOME, req.url));
  }

  // Allow everything
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
