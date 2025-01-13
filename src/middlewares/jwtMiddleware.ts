import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const jwt_secret: any = process.env.JWT_SECRET || "";

export function jwtMiddleware(req: any) {
  if (req.nextUrl.pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { message: "Access Denied. Please provide the access token" },
      { status: 401 },
    );
  }

  try {
    const decoded: any = jwt.decode(token, jwt_secret);
    console.log(decoded);
    req.user = decoded;
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
