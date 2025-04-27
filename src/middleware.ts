import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Function to get user from cookies
function getUser(request: NextRequest): any {
  const user = request.cookies.get("user")?.value;
  return (user && JSON.parse(user)) || "";
}

// Function to get token from cookies
function getUserToken(request: NextRequest): string | null {
  return request.cookies.get("token")?.value || null;
}

// function getUserTracker(request: NextRequest): string | null {
//   return request.cookies.get("tracker")?.value || null;
// }

// Middleware
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = getUserToken(request);
  const user = getUser(request);

  const needsAuth = pathname.startsWith("/dashboard");
  const isLogin = pathname.startsWith("/login");

  // Handle unauthenticated access
  if (needsAuth && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Handle authenticated redirects
  if (isLogin && token) {
    if (user?.role === "ADMIN" && pathname !== "/dashboard") {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    } else if (pathname !== "/") {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
  }
  return NextResponse.next();

  // If authenticated, ensure the user is on their respective dashboard
  // if (pathname == "/") {
  //     return NextResponse.redirect(new URL("/login", request.nextUrl));
  // } else {
  //     return NextResponse.next();
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
