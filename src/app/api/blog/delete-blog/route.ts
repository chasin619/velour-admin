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

export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    await dbConnect();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 },
      );
    }

    const deletedBlog: BlogDocument | null = await Blog.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Blog deleted successfully", blog: deletedBlog },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
