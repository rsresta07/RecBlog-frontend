import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// helpers
function getUser(req: NextRequest) {
  const raw = req.cookies.get("user")?.value;
  return raw ? JSON.parse(raw) : null;
}
function getToken(req: NextRequest) {
  return req.cookies.get("token")?.value || null;
}

// middleware
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = getToken(req);
  const user = getUser(req);

  const isLogin = pathname.startsWith("/login");
  const isHome = pathname === "/";
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
