import { NextResponse } from "next/server";
import dbConnect from "@/libs/db";

import Portfolio from "../../models/portfolio";

interface PortfolioRequestBody {
  title: string;
  images: any[];
}

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const userId = req.headers.get("userId");
    const body: PortfolioRequestBody = await req.json();
    const { title, images } = body;

    await dbConnect();

    const portfolio = await Portfolio.create({ title, images, userId });

    return NextResponse.json(
      { message: "Portfolio added successfully", portfolio },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
