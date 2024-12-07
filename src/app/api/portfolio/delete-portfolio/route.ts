import { NextResponse } from "next/server";
import Portfolio from "../../models/portfolio";
import dbConnect from "@/libs/db";

interface PortfolioDocument {
  _id: string;
  title: string;
  images: any[];
}

export const maxDuration = 60;
export const dynamic = "force-dynamic";

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

    const deletedPortfolio: PortfolioDocument[] | null =
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
