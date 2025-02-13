import { NextResponse, type NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./app/api/auth/[...nextauth]/route";
import { GET as handlerGet} from "@/app/api/auth/[...nextauth]/route";


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Only protect paths that require authentication
  debugger;
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/profile")
  ) {
    const session = await getServerSession(handlerGet);
    console.log("Session from middleware:", session);
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Check role: Admin Panel only for ADMIN, userProfile for USER (or higher)
    if (pathname.startsWith("/admin") && session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname.startsWith("/profile") && session.user.role !== "USER") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
