import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/auth/login", "/auth/signup"];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const protectedRoutes = [
    "/",
    "/inventory",
    "/chat",
    "/meeting-app",
    "/internal-requisitions",
  ];

  const isProtected = protectedRoutes.some(
    (route) =>
      pathname === route || (route !== "/" && pathname.startsWith(route)),
  );

  // if (isProtected && !isPublicRoute && !token) {
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }

  return NextResponse.next();
}
