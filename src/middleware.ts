import { NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(req: any) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/auth/")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    const res = NextResponse.next();

    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set("Access-Control-Allow-Methods", "*");
    res.headers.set(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    );
    res.headers.set("Access-Control-Allow-Origin", "*");

    return res;
  }

  const protectedPages = [
    "/",
    "/blog",
    "/review",
    "/portfolio",
    "/blog/addBlog",
  ];

  if (protectedPages.includes(pathname)) {
    const cookies = parse(req.headers.get("cookie") || "");
    const accessToken = cookies.accessToken;

    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/",
    "/blog",
    "/review",
    "/portfolio",
    "/blog/addBlog",
    "/auth/:path*",
  ],
};
