import { NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/auth";
import { corsMiddleware } from "./middlewares/cors";
import { protectedRoutesMiddleware } from "./middlewares/protectedRoutes";
import { jwtMiddleware } from "./middlewares/jwtMiddleware";

export function middleware(req: any) {
  
  const authResponse = authMiddleware(req);
  if (authResponse instanceof NextResponse) return authResponse;
  
  const jwtResponse = jwtMiddleware(req);
  if (jwtResponse instanceof NextResponse) return jwtResponse;

  const corsResponse = corsMiddleware(req);
  if (corsResponse instanceof NextResponse) return corsResponse;

  const protectedResponse = protectedRoutesMiddleware(req);
  if (protectedResponse instanceof NextResponse) return protectedResponse;

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
