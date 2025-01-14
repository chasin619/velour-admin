import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";

import Portfolio from "../models/portfolio";

interface PortfolioRequestBody {
  title: string;
  images: any[];
}

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const user = JSON.parse(req.headers.get("user") || "{}");
    const body: PortfolioRequestBody = await req.json();
    const { title, images } = body;

    if (!title || !images) {
      return NextResponse.json(
        { error: "Title and images are required" },
        { status: 400 },
      );
    }

    await dbConnect();

    const portfolio = await Portfolio.create({ title, images, userId: user.id });

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

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const user = JSON.parse(req.headers.get("user") || "{}");
    await dbConnect();

    const portfolios: PortfolioRequestBody[] = (
      await Portfolio.find({ userId: user.id })
    ).reverse();

    return NextResponse.json({ portfolios }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Portfolio Id is required" },
        { status: 400 },
      );
    }

    const deletedPortfolio: PortfolioRequestBody[] | null =
      await Portfolio.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: "Portfolio deleted successfully",
        portfolio: deletedPortfolio,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
