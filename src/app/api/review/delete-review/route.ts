import { NextResponse } from "next/server";

import dbConnect from "@/libs/db";
import Review from "../../models/review";

interface ReviewDocument {
  _id: string;
  image: string;
}

export const maxDuration = 60;
export const dynamic = "force-dynamic";

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

    const deletedPortfolio: ReviewDocument[] | null =
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
