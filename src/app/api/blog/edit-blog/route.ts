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

export async function PUT(req: Request): Promise<NextResponse> {
  try {
    await dbConnect();

    const body = await req.json();
    const { id, title, content, image, author } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 },
      );
    }

    const updatedBlog: BlogDocument | null = await Blog.findByIdAndUpdate(
      id,
      { title, content, image, author, updatedAt: new Date() },
      { new: true },
    );

    return NextResponse.json(
      { message: "Blog updated successfully", blog: updatedBlog },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
