import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });

  const protectedRoutes = [
    "/child-profile",
    "/resources-map",
    "/staff-directory",
    "/support-groups",
  ];

  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: ["/child-profile/:path*", "/resources-map/:path*", "/staff-directory/:path*", "/support-groups/:path*"],
};