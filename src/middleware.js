import { NextResponse } from "next/server";
import ROUTES from "./constants/routes";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Get auth token from cookies and strip surrounding quotes (js-cookie adds them)
  const rawToken = req.cookies.get("TOKEN")?.value;
  const authToken = rawToken?.replace(/^"|"$/g, ""); // ← sync with customBaseQuery

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

  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
