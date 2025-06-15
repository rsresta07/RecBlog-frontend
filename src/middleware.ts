import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// cookie helpers
function getUser(request: NextRequest) {
  const raw = request.cookies.get("user")?.value;
  return (raw && JSON.parse(raw)) || null;
}

function getUserToken(request: NextRequest): string | null {
  return request.cookies.get("token")?.value || null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = getUserToken(request);
  const user = getUser(request);

  const isLogin = pathname.startsWith("/login");
  const isHome = pathname === "/";
  const onDashboard = pathname.startsWith("/dashboard");
  const onUserPage = pathname.startsWith("/user");

  const needsAuth = onDashboard || onUserPage;

  // 1. Block unauthenticated access
  if (!token && needsAuth) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (!user) return NextResponse.next(); // cookie missing → let it pass

  // 2. Role‑based redirects for logged‑in users
  const slug = user?.slug ?? ""; // assume slug lives on the user cookie

  // 2a. User hits /login while already signed in
  if (isLogin) {
    if (user.role === "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
    if (user.role === "USER") {
      return NextResponse.redirect(new URL(`/user/${slug}`, request.nextUrl));
    }
  }

  // 2b. USER tries to access /dashboard
  if (onDashboard && user.role === "USER") {
    return NextResponse.redirect(new URL(`/user/${slug}`, request.nextUrl));
  }

  // 2c. ADMIN tries to access /user/*
  if (onUserPage && user.role === "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

// Apply middleware to relevant routes
export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/user/:path*"],
};
