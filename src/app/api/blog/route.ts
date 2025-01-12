import { NextResponse } from "next/server";
import dbConnect from "@/libs/db";
import slugify from "slugify";

import Blog from "../models/blog";

interface BlogRequestBody {
  title: string;
  content: string;
  image: string;
  author: string;
  meta_description: string;
}

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const userId = req.headers.get("userId");
    const body: BlogRequestBody = await req.json();
    const { title, content, image, author, meta_description } = body;

    if (!title || !content || !image || !author || !meta_description) {
      return NextResponse.json(
        {
          message:
            "Title, Content, Image, Author and Meta Description are required",
        },
        { status: 400 },
      );
    }

    const slug = slugify(title, { lower: true, strict: true });

    const blog = await Blog.create({
      userId,
      title,
      content,
      image,
      author,
      meta_description,
      slug,
    });

    return NextResponse.json(
      { message: "Blog added successfully", blog },
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
    const userId = req.headers.get("userId");
    await dbConnect();

    const blogs: BlogRequestBody[] = await Blog.find({ userId: userId }).sort({
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

export async function PUT(req: Request): Promise<NextResponse> {
  try {
    await dbConnect();

    const body = await req.json();
    const { id, title, content, image, author, meta_description } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 },
      );
    }

    const updatedBlog: BlogRequestBody | null = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
        image,
        author,
        meta_description,
        updatedAt: new Date(),
      },
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

    const deletedBlog: BlogRequestBody | null =
      await Blog.findByIdAndDelete(id);

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
