import { NextResponse } from "next/server";

export function corsMiddleware(req: Request) {
  const allowedOrigins = ["http://localhost:3001", "https://chicflowers.com"];
  const origin = req.headers.get("origin");

  if (origin && allowedOrigins.includes(origin)) {
    const res = NextResponse.next();
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    res.headers.set("Access-Control-Allow-Credentials", "true");
    return res;
  }

  return NextResponse.next();
}
