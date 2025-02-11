// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/route";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Only protect paths that require authentication
  if (
    pathname.startsWith("/adminPanel") ||
    pathname.startsWith("/userProfile")
  ) {
    const session = await getServerSession(authOptions, request);
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Check role: Admin Panel only for ADMIN, userProfile for USER (or higher)
    if (pathname.startsWith("/adminPanel") && session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname.startsWith("/userProfile") && session.user.role !== "USER") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/adminPanel/:path*", "/userProfile/:path*"],
};
