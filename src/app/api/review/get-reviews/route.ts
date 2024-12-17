import { NextResponse } from "next/server";

import dbConnect from "@/libs/db";
import Review from "../../models/review";

interface ReviewDocument {
  _id: string;
  image: string;
}

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const userId = req.headers.get("userId");
    await dbConnect();

    const reviews: ReviewDocument[] = (
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
