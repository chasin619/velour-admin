import { NextResponse } from "next/server";
import { parse } from "cookie";

const protectedPages = [
  "/",
  "/blog",
  "/review",
  "/portfolio",
  "/blog/addBlog",
];

export function protectedRoutesMiddleware(req: any) {
  const { pathname } = req.nextUrl;

  if (protectedPages.includes(pathname)) {
    const cookies = parse(req.headers.get("cookie") || "");
    const accessToken = cookies.accessToken;

    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}
