import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import BlogForm from "@/components/BlogForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Next.js Settings Page | NextAdmin - Next.js Dashboard c",
  description: "This is Next.js Settings page for NextAdmin Dashboard Kit",
};

const AddBlog = () => {
  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="Add Blog" />
      <Suspense fallback={<div />}>
        <BlogForm />
      </Suspense>
    </div>
  );
};

export default AddBlog;
