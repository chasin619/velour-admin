import { NextResponse } from "next/server";
import { parse } from "cookie";

const clientPages = [
  "/",
  "/dashboard/blog",
  "/dashboard/review",
  "/dashboard/portfolio",
  "/dashboard/blog/addBlog",
];

const adminPages = ["/admin", "/admin/users"];

export function protectedRoutesMiddleware(req: any) {
  const { pathname } = req.nextUrl;

  const cookies = parse(req.headers.get("cookie") || "");
  if (clientPages.includes(pathname)) {
    const accessToken = cookies.accessToken;

    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  const userRole = cookies.role;
  if (!userRole) return NextResponse.next();

  if (adminPages.includes(pathname) && userRole !== "admin") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (clientPages.includes(pathname) && userRole !== "client") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
