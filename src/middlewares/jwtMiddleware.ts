import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const jwt_secret: any = process.env.JWT_SECRET || "";

export function jwtMiddleware(req: any) {
  const { pathname } = req.nextUrl;

  const apis = ["api/blog", "api/client", "api/review", "api/portfolio"];

  if (pathname.startsWith("/api/auth/") || !apis.some((api) => pathname.startsWith(`/${api}`))) {
    return NextResponse.next();
  }

  const token = req.headers.get("Authorization")?.split(" ")[1];

  try {
    const decoded = jwt.decode(token, jwt_secret);
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("user", JSON.stringify(decoded.user));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
