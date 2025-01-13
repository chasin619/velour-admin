import { NextResponse } from "next/server";
import dbConnect from "@/libs/db";

import Review from "../models/review";

interface ReviewRequestBody {
  image: string;
}

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const userId = req.headers.get("userId");
    const body: ReviewRequestBody = await req.json();
    const { image } = body;

    await dbConnect();

    const review = await Review.create({ image, userId });

    return NextResponse.json(
      { message: "Review added successfully", review },
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
    const userId = req.user;
    await dbConnect();

    const reviews: ReviewRequestBody[] = (
      await Review.find({ userId: userId })
    ).reverse();

    return NextResponse.json({ reviews }, { status: 200 });
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
        { error: "Review Id is required" },
        { status: 400 },
      );
    }

    const deletedPortfolio: ReviewRequestBody[] | null =
      await Review.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: "Review deleted successfully",
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
