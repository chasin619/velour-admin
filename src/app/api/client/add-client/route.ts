import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dbConnect from "@/libs/db";
import User from "../../models/user";

interface ClientRequestBody {
  fullName: string;
  email: string;
  password: string;
  portalName: string;
}

const jwt_secret = process.env.JWT_SECRET || "";

export async function POST(req: Request) {
  try {
    const body: ClientRequestBody = await req.json();
    const { fullName, email, password, portalName } = body;

    await dbConnect();
    const existingClient: any = await User.findOne({ email });
    if (existingClient) {
      return NextResponse.json(
        { error: "Client Already Exist" },
        { status: 500 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await User.create({
      fullName,
      email,
      password: hashedPassword,
      portalName,
      role: "client",
    });

    const data = {
      client: {
        id: client._id,
      },
    };

    const accessToken = jwt.sign(data, jwt_secret);

    return NextResponse.json(
      { message: "Client added successfully", client, accessToken },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}