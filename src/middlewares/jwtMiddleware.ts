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
    const decoded: any = jwt.decode(token, jwt_secret);
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("user", JSON.stringify(decoded?.user));

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
    response.headers.set("Access-Control-Allow-Credentials", "true");

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
