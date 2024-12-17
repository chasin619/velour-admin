import { NextResponse } from "next/server";

export function corsMiddleware(req: any) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/")) {
    const res = NextResponse.next();
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set("Access-Control-Allow-Methods", "*");
    res.headers.set("Access-Control-Allow-Origin", "*");

    return res;
  }
}
