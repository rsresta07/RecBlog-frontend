import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Retrieves the user object from the request cookies.
 *
 * @param req The request object from next/server.
 * @returns The user object if found, otherwise null.
 */
function getUser(req: NextRequest) {
  const raw = req.cookies.get("user")?.value;
  return raw ? JSON.parse(raw) : null;
}

/**
 * Retrieves the auth token from the request cookies.
 *
 * @param req The request object from next/server.
 * @returns The auth token if found, otherwise null.
 */
function getToken(req: NextRequest) {
  return req.cookies.get("token")?.value || null;
}

/**
 * Middleware function to handle authentication and authorization for specific routes.
 *
 * This function checks the request's URL and cookies to determine if the user is
 * authenticated and authorized to access certain routes. It redirects users to
 * appropriate pages based on their authentication status and role.
 *
 * - Redirects unauthenticated users trying to access protected routes to the login page.
 * - Prevents already signed-in users from accessing the login page.
 * - Redirects users to different pages based on their roles and the requested route.
 *
 * @param req The request object from next/server.
 * @returns A NextResponse object to either redirect or proceed with the request.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = getToken(req);
  const user = getUser(req);

  const isLogin = pathname.startsWith("/login");
  const onDashboard = pathname.startsWith("/dashboard");
  const onUserEdit = /^\/user\/[^/]+\/edit$/.test(pathname);

  //  routes that require auth
  const needsAuth = onDashboard || onUserEdit;

  // 1. Block unauthenticated access
  if (needsAuth && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // No user cookie? just continue
  if (!user) return NextResponse.next();

  const slug = user.slug ?? "";

  // already‑signed‑in hits /login
  if (isLogin) {
    if (user.role === "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    if (user.role === "USER") {
      return NextResponse.redirect(new URL(`/user/${slug}`, req.nextUrl));
    }
  }

  // normal role redirects you already had
  if (onDashboard && user.role === "USER") {
    return NextResponse.redirect(new URL(`/user/${slug}`, req.nextUrl));
  }
  if (onUserEdit && user.role === "SUPER_ADMIN") {
    // Optional: prevent admins editing user profiles
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// middleware scope
export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/user/:slug*/edit", // edit page only
  ],
};
