import { NextResponse } from "next/server";
import dbConnect from "@/libs/db";
import slugify from "slugify";

import Blog from "../../models/blog";

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
    const userId = req.headers.get("userId");
    const body: BlogRequestBody = await req.json();
    const { title, content, image, author, meta_description } = body;
    const slug = slugify(title, { lower: true, strict: true });

    await dbConnect();

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
