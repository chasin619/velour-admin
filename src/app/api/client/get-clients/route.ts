import { NextResponse } from "next/server";
import dbConnect from "@/libs/db";
import User from "../../models/user";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({role: "client"}).select("-password");
    return NextResponse.json({ clients: users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
