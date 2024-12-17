import { NextResponse } from "next/server";

export function authMiddleware(req: any) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/auth/")) {
    return NextResponse.next();
  }
}
