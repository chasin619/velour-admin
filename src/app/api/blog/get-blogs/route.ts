import { NextResponse } from "next/server";
import Blog from "../../models/blog";
import dbConnect from "@/libs/db";

interface BlogDocument {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const userId = req.headers.get("userId");
    await dbConnect();

    const blogs: BlogDocument[] = await Blog.find({ userId: userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
