import { NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/auth";
import { protectedRoutesMiddleware } from "./middlewares/protectedRoutes";
import { jwtMiddleware } from "./middlewares/jwtMiddleware";

export function middleware(req: Request) {
  const res = NextResponse.next();
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "*");
  res.headers.set("Access-Control-Allow-Headers", "*");
  res.headers.set("Access-Control-Allow-Credentials", "true");

  const jwtResponse = jwtMiddleware(req);
  if (jwtResponse instanceof NextResponse) {
    return jwtResponse;
  }

  const authResponse = authMiddleware(req);
  if (authResponse instanceof NextResponse) {
    return authResponse;
  }

  const protectedResponse = protectedRoutesMiddleware(req);
  if (protectedResponse instanceof NextResponse) {
    return protectedResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/",
    "/dashboard/:path*",
    "/auth/:path*",
    "/admin/:path*",
  ],
};
