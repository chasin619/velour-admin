import { NextResponse } from "next/server";
import Portfolio from "../models/portfolio";
import dbConnect from "@/libs/db";

interface PortfolioDocument {
  _id: string;
  title: string;
  images: any[];
}

export async function GET(): Promise<NextResponse> {
  try {
    await dbConnect();

    const portfolios: PortfolioDocument[] = await Portfolio.find();

    return NextResponse.json({ portfolios }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
